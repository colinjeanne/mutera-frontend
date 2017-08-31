import {
    Action,
    handleActions
} from 'redux-actions';
import * as Actions from './../actions/index';
import knownVariables from './../knownVariables';
import { State } from './../types/state';
import { Variable } from './../types/variable';

const initialState: State = {
    genes: new Map(),
    name: '',
    order: [],
    variables: knownVariables
};

let lastId = 1;

const makeGeneId = () => {
    return `${++lastId}`;
};

type Payloads =
    Actions.AddVariablePayload |
    Actions.InsertGenePayload |
    Actions.RemoveGenePayload |
    Actions.RemoveVariablePayload |
    Actions.ShiftGenePayload |
    Actions.UpdateGenePayload |
    Actions.UpdateNamePayload;

export const reducer = handleActions<State, Payloads>({
    addVariable: (state, action: Action<Actions.AddVariablePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { dataType, name } = action.payload;
        const updatedVariables: Variable[] = [
            ...state.variables,
            {
                dataType,
                name,
                type: 'input'
            },
            {
                dataType,
                name,
                type: 'output'
            }
        ];

        return {
            ...state,
            variables: updatedVariables
        };
    },

    insertGene: (state, action: Action<Actions.InsertGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const id = makeGeneId();
        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.set(id, '');

        const { index } = action.payload;
        const updatedOrder = [...state.order];
        updatedOrder.splice(index, 0, id);

        return {
            ...state,
            genes: updatedGenes,
            order: updatedOrder
        };
    },

    removeGene: (state, action: Action<Actions.RemoveGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { id } = action.payload;
        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.delete(id);
        const updatedOrder = state.order.filter(geneId => geneId !== id);

        return {
            ...state,
            genes: updatedGenes,
            order: updatedOrder
        };
    },

    removeVariable: (state, action: Action<Actions.RemoveVariablePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { name, type } = action.payload;
        const updatedVariables = state.variables.filter(
            variable =>
                (variable.name.toLowerCase() !== name.toLowerCase()) ||
                (variable.type !== type));

        return {
            ...state,
            variables: updatedVariables
        };
    },

    shiftGene: (state, action: Action<Actions.ShiftGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { direction, id } = action.payload;
        const index = state.order.findIndex(existing => existing === id);

        const updatedOrder = [...state.order];
        updatedOrder.splice(index, 1);
        if (direction === 'down') {
            updatedOrder.splice(index + 1, 0, id);
        } else {
            updatedOrder.splice(index - 1, 0, id);
        }

        return {
            ...state,
            order: updatedOrder
        };
    },

    updateGene: (state, action: Action<Actions.UpdateGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { id, text } = action.payload;
        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.set(id, text);

        return {
            ...state,
            genes: updatedGenes
        };
    },

    updateName: (state, action: Action<Actions.UpdateNamePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { name } = action.payload;
        return {
            ...state,
            name
        };
    }
}, initialState);
