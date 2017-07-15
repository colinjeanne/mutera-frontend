import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import getOperatorData from './../../getOperatorData';
import { RealOperator } from './../../types/operator';

interface ExpressionProps {
    operator: RealOperator;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type Props = ExpressionProps & CollectedProps;

const source: DragSourceSpec<Props> = {
    beginDrag(props) {
        const operatorData = getOperatorData(props.operator);
        return {
            arity: operatorData.arity,
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

export const RealExpressionButton =
    DragSource<ExpressionProps>(
        'realExpression',
        source,
        collect)(ExpressionButton);
