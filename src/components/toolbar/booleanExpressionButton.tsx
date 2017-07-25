import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import {
    BooleanOperator,
    getOperatorArity
} from './../../types/operator';

interface ExpressionProps {
    operator: BooleanOperator;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type Props = ExpressionProps & CollectedProps;

const source: DragSourceSpec<Props> = {
    beginDrag(props) {
        return {
            arity: getOperatorArity(props.operator),
            operator: props.operator
        };
    }
};

const collect: DragSourceCollector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const ExpressionButton: React.SFC<Props> = props => {
    const classes = ['toolbar-button'];
    if (props.isDragging) {
        classes.push('dragged');
    }

    return props.connectDragSource(
        <div className={classes.join(' ')}>
            {props.children}
        </div>
    );
};

export const BooleanExpressionButton =
    DragSource<ExpressionProps>(
        'booleanExpression',
        source,
        collect)(ExpressionButton);
