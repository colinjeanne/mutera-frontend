import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import { Expression as ExpressionType } from './../../types/expression';
import {
    getOperatorArity,
    getOperatorConnectorType
} from './../../types/operator';
import TreeConnector from './../treeConnector';

interface Props {
    expression: ExpressionType;
    leftChild?: ExpressionType;
    rightChild?: ExpressionType;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type ExpressionProps = Props & CollectedProps;

const source: DragSourceSpec<ExpressionProps> = {
    beginDrag(props) {
        return props.expression;
    }
};

const collect: DragSourceCollector = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const Expression: React.SFC<ExpressionProps> = props => {
    const arity = getOperatorArity(props.expression.operator);
    const connectorType = getOperatorConnectorType(props.expression.operator);
    const connectors = (arity !== 0) ?
        (
            <TreeConnector
                arity={arity}
                id={props.expression.id}
                leftChild={props.leftChild}
                leftConnectorType={connectorType}
                rightChild={props.rightChild}
                rightConnectorType={connectorType}
            />
        ) :
        undefined;

    const classes = ['tree-node', props.expression.operator];
    if (props.isDragging) {
        classes.push('dragged');
    }

    return props.connectDragSource(
        <div className={classes.join(' ')}>
            <div className='tree-content'>
                {props.children}
            </div>
            {connectors}
        </div>
    );
};

export const BooleanExpression =
    DragSource<Props>('booleanExpression', source, collect)(Expression);

export const RealExpression =
    DragSource<Props>('realExpression', source, collect)(Expression);
