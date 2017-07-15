import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import {
    connect as reduxConnect,
    DispatchProp
} from 'react-redux';
import getOperatorData from './../getOperatorData';
import { Expression as ExpressionType } from './../types/expression';
import { ExpressionId } from './../types/id';
import { Operator } from './../types/operator';
import { State } from './../types/state';
import {
    BooleanExpressionConnector,
    RealExpressionConnector
} from './connector';

interface BaseExpressionProps {
    id: ExpressionId;
}

interface OwnProps {
    id: ExpressionId;
    operator: Operator;
}

interface MappedProps {
    expression: ExpressionType;
    leftChild?: ExpressionType;
    rightChild?: ExpressionType;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type ExpressionProps = OwnProps & MappedProps & CollectedProps & DispatchProp<any>;

const source: DragSourceSpec<ExpressionProps> = {
    beginDrag(props) {
        if (props.expression.arity === 0) {
            return {
                arity: props.expression.arity,
                data: props.expression.data,
                id: props.id,
                operator: props.operator,
                parentId: props.expression.parentId
            };
        } else if (props.expression.arity === 1) {
            return {
                arity: props.expression.arity,
                id: props.id,
                leftId: props.expression.leftId,
                operator: props.operator,
                parentId: props.expression.parentId
            };
        }

        return {
            arity: props.expression.arity,
            id: props.id,
            leftId: props.expression.leftId,
            operator: props.operator,
            parentId: props.expression.parentId,
            rightId: props.expression.rightId
        };
    }
};

const collect: DragSourceCollector = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const Expression: React.SFC<ExpressionProps> = props => {
    const operatorData = getOperatorData(props.operator);
    let leftChild;
    let rightChild;
    if (operatorData.connectorType !== 'none') {
        if (operatorData.arity !== 0) {
            if (props.leftChild) {
                const Type = getExpressionForOperator(props.leftChild.operator);

                leftChild = (
                    <Type id={props.leftChild.id} />
                );
            } else if (operatorData.connectorType === 'boolean') {
                leftChild = (
                    <BooleanExpressionConnector
                        isLeftChild={true}
                        parentId={props.id}
                    />
                );
            } else {
                leftChild = (
                    <RealExpressionConnector
                        isLeftChild={true}
                        parentId={props.id}
                    />
                );
            }
        }

        if (operatorData.arity === 2) {
            if (props.rightChild) {
                const Type =
                    getExpressionForOperator(props.rightChild.operator);

                rightChild = (
                    <Type id={props.rightChild.id} />
                );
            } else if (operatorData.connectorType === 'boolean') {
                rightChild = (
                    <BooleanExpressionConnector
                        isLeftChild={false}
                        parentId={props.id}
                    />
                );
            } else {
                rightChild = (
                    <RealExpressionConnector
                        isLeftChild={false}
                        parentId={props.id}
                    />
                );
            }
        }
    }

    const classes = ['tree-node', props.operator];
    if (props.isDragging) {
        classes.push('dragged');
    }

    return props.connectDragSource(
        <div className={classes.join(' ')}>
            <div className='tree-content'>
                <div>
                    {props.operator}
                </div>
            </div>
            <div className='connectors'>
                {leftChild}
                {rightChild}
            </div>
        </div>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    const expression = state.expressions.get(ownProps.id) as ExpressionType;
    const leftChild = (expression.arity !== 0) && expression.leftId ?
        state.expressions.get(expression.leftId) :
        undefined;
    const rightChild = (expression.arity === 2) && expression.rightId ?
        state.expressions.get(expression.rightId) :
        undefined;

    return {
        expression,
        leftChild,
        rightChild
    };
};

const Connector = reduxConnect(mapStateToProps);

const BooleanExpression =
    Connector(DragSource('booleanExpression', source, collect)(Expression));

const RealExpression =
    Connector(DragSource('realExpression', source, collect)(Expression));

const expressionType = {
    A: BooleanExpression,
    B: BooleanExpression,
    C: RealExpression,
    D: RealExpression,
    G: BooleanExpression,
    L: BooleanExpression,
    M: RealExpression,
    N: BooleanExpression,
    O: BooleanExpression,
    P: RealExpression,
    R: RealExpression,
    S: RealExpression,
    T: BooleanExpression
};

const OperatorExpression = (operator: Operator) => (props: BaseExpressionProps) => {
    const Type = expressionType[operator];
    return <Type operator={operator} {...props} />;
};

export const AndExpression = OperatorExpression('A');
export const BooleanVariableExpression = OperatorExpression('B');
export const RealConstantExpression = OperatorExpression('C');
export const DivisionExpression = OperatorExpression('D');
export const GreaterThanExpression = OperatorExpression('G');
export const LessThanExpression = OperatorExpression('L');
export const MultiplicationExpression = OperatorExpression('M');
export const NotExpression = OperatorExpression('N');
export const OrExpression = OperatorExpression('O');
export const AdditionExpression = OperatorExpression('P');
export const RealVariableExpression = OperatorExpression('R');
export const SubtractionExpression = OperatorExpression('S');
export const TrueExpression = OperatorExpression('T');

const operatorExpressions = {
    A: AndExpression,
    B: BooleanVariableExpression,
    C: RealConstantExpression,
    D: DivisionExpression,
    G: GreaterThanExpression,
    L: LessThanExpression,
    M: MultiplicationExpression,
    N: NotExpression,
    O: OrExpression,
    P: AdditionExpression,
    R: RealVariableExpression,
    S: SubtractionExpression,
    T: TrueExpression
};

export const getExpressionForOperator = (operator: Operator) =>
    operatorExpressions[operator];
