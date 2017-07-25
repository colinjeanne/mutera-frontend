import {
    Action,
    handleActions
} from 'redux-actions';
import * as Actions from './../actions/index';
import {
    BinaryExpression,
    BooleanVariableExpression,
    ConstantExpression,
    Expression,
    RealVariableExpression,
    UnaryExpression
} from './../types/expression';
import { Gene } from './../types/gene';
import {
    areIdsEqual,
    BooleanExpressionId,
    ExpressionId,
    GeneId,
    isBooleanExpressionId,
    isGeneId,
    RealExpressionId
} from './../types/id';
import { isBooleanOperator } from './../types/operator';

type ExpressionMap = Map<ExpressionId, Expression>;
type GeneMap = Map<GeneId, Gene>;

interface State {
    readonly expressions: ExpressionMap;
    readonly genes: GeneMap;
    readonly order: ReadonlyArray<GeneId>;
}

const initialState: State = {
    expressions: new Map(),
    genes: new Map(),
    order: []
};

let lastId = 1;

const makeBooleanExpressionId = (): BooleanExpressionId => {
    ++lastId;
    return {
        id: lastId,
        type: 'booleanExpression'
    };
};

const makeRealExpressionId = (): RealExpressionId => {
    ++lastId;
    return {
        id: lastId,
        type: 'realExpression'
    };
};

const makeGeneId = (): GeneId => {
    ++lastId;
    return {
        id: lastId,
        type: 'gene'
    };
};

type Payloads =
    Actions.CompleteBooleanVariablePayload |
    Actions.CompleteConstantPayload |
    Actions.CompleteGenePayload |
    Actions.CompleteRealVariablePayload |
    Actions.DropExpressionPayload |
    Actions.DropGenePayload;

export const reducer = handleActions<State, Payloads>({
    completeBooleanVariable: (state, action: Action<Actions.CompleteBooleanVariablePayload>) => {
        if (!action.payload) {
            return state;
        }

        const expression = state.expressions.
            get(action.payload.expressionId) as BooleanVariableExpression;
        const updatedExpression = {
            ...expression,
            data: action.payload.variable
        };

        const updatedExpressions = new Map(state.expressions.entries());
        updatedExpressions.set(updatedExpression.id, updatedExpression);

        return {
            ...state,
            expressions: updatedExpressions
        };
    },

    completeConstant: (state, action: Action<Actions.CompleteConstantPayload>) => {
        if (!action.payload) {
            return state;
        }

        const expression = state.expressions.
            get(action.payload.expressionId) as ConstantExpression;
        const updatedExpression = {
            ...expression,
            data: action.payload.constant
        };

        const updatedExpressions = new Map(state.expressions.entries());
        updatedExpressions.set(updatedExpression.id, updatedExpression);

        return {
            ...state,
            expressions: updatedExpressions
        };
    },

    completeGene: (state, action: Action<Actions.CompleteGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const gene = state.genes.get(action.payload.geneId) as Gene;
        const updatedGene = {
            ...gene,
            output: action.payload.output
        };

        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.set(updatedGene.id, updatedGene);

        return {
            ...state,
            genes: updatedGenes
        };
    },

    completeRealVariable: (state, action: Action<Actions.CompleteRealVariablePayload>) => {
        if (!action.payload) {
            return state;
        }

        const expression = state.expressions.
            get(action.payload.expressionId) as RealVariableExpression;
        const updatedExpression = {
            ...expression,
            data: action.payload.variable
        };

        const updatedExpressions = new Map(state.expressions.entries());
        updatedExpressions.set(updatedExpression.id, updatedExpression);

        return {
            ...state,
            expressions: updatedExpressions
        };
    },

    dropExpression: (state, action: Action<Actions.DropExpressionPayload>) => {
        if (!action.payload) {
            return state;
        }

        const { isLeftChild, expression, parentId } = action.payload;

        const updatedExpressions = new Map(state.expressions.entries());
        let updatedGenes = state.genes;
        if (!expression.id) {
            expression.parentId = parentId;

            if (isBooleanOperator(expression.operator)) {
                expression.id = makeBooleanExpressionId();
            } else {
                expression.id = makeRealExpressionId();
            }

            updatedExpressions.set(expression.id, expression);
        } else {
            const oldParentId = (updatedExpressions.get(expression.id) as Expression).parentId;
            if (oldParentId) {
                if (isGeneId(oldParentId)) {
                    updatedGenes = new Map(updatedGenes.entries());
                    const oldParent = (updatedGenes.get(oldParentId) as Gene);
                    if (isBooleanExpressionId(expression.id)) {
                        const updatedParent = {
                            ...oldParent,
                            conditionId: undefined
                        };

                        updatedGenes.set(oldParentId, updatedParent);
                    } else {
                        const updatedParent = {
                            ...oldParent,
                            expressionId: undefined
                        };

                        updatedGenes.set(oldParentId, updatedParent);
                    }
                } else {
                    const oldParent = (updatedExpressions.get(oldParentId) as Expression);
                    if (oldParent.arity === 1) {
                        const updatedParent = {
                            ...oldParent,
                            leftId: undefined
                        };

                        updatedExpressions.set(oldParentId, updatedParent);
                    } else if (oldParent.arity === 2) {
                        if (oldParent.leftId &&
                            areIdsEqual(oldParent.leftId, expression.id)) {
                            const updatedParent = {
                                ...oldParent,
                                leftId: undefined
                            };

                            updatedExpressions.set(oldParentId, updatedParent);
                        } else {
                            const updatedParent = {
                                ...oldParent,
                                rightId: undefined
                            };

                            updatedExpressions.set(oldParentId, updatedParent);
                        }
                    }
                }
            }
        }

        if (isGeneId(parentId)) {
            const parent = (updatedGenes.get(parentId) as Gene);
            let updatedParent;
            if (isLeftChild) {
                updatedParent = {
                    ...parent,
                    conditionId: expression.id as BooleanExpressionId
                };
            } else {
                updatedParent = {
                    ...parent,
                    expressionId: expression.id as RealExpressionId
                };
            }

            updatedGenes.set(parentId, updatedParent as Gene);
        } else {
            const parent = (updatedExpressions.get(parentId) as BinaryExpression | UnaryExpression);
            let updatedParent;
            if (isLeftChild) {
                updatedParent = {
                    ...parent,
                    leftId: expression.id
                };
            } else {
                updatedParent = {
                    ...parent,
                    rightId: expression.id
                };
            }

            updatedExpressions.set(parentId, updatedParent as Expression);
        }

        const updatedExpression = {
            ...expression,
            parentId
        };

        updatedExpressions.set(expression.id, updatedExpression);

        return {
            ...state,
            expressions: updatedExpressions,
            genes: updatedGenes
        };
    },

    dropGene: (state, action: Action<Actions.DropGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { gene, index } = action.payload;

        let updatedGenes = state.genes;
        if (!gene.id) {
            gene.id = makeGeneId();
            updatedGenes = new Map(updatedGenes.entries());
            updatedGenes.set(gene.id, gene);
        }

        const updatedOrder = [...state.order];
        const geneIndex = state.order.findIndex(
            existing => areIdsEqual(existing, gene.id));
        if (geneIndex === -1) {
            updatedOrder.splice(index, 0, gene.id);
        } else if ((index !== geneIndex) && (index !== geneIndex + 1)) {
            if (index < geneIndex) {
                updatedOrder.splice(geneIndex, 1);
                updatedOrder.splice(index, 0, gene.id);
            } else {
                updatedOrder.splice(index, 0, gene.id);
                updatedOrder.splice(geneIndex, 1);
            }
        }

        return {
            ...state,
            genes: updatedGenes,
            order: updatedOrder
        };
    }
}, initialState);
