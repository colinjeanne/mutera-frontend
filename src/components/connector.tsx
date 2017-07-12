import * as React from 'react';
import {
    ConnectDropTarget,
    DropTarget,
    DropTargetCollector,
    DropTargetSpec
} from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    dropExpression,
    DropExpressionPayload
} from './../actions/index';
import { Expression } from './../types/expression';
import { Id } from './../types/id';
import { State } from './../types/state';

interface OwnProps {
    isLeftChild: boolean;
    parentId: Id;
}

interface DispatchProps {
    onDropExpression: (s: DropExpressionPayload) => Action;
}

interface CollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
}

type ConnectorProps = OwnProps & DispatchProps & CollectedProps;

const target: DropTargetSpec<ConnectorProps> = {
    drop(props, monitor) {
        if (!monitor) {
            return undefined;
        }

        props.onDropExpression({
            expression: monitor.getItem() as Expression,
            isLeftChild: props.isLeftChild,
            parentId: props.parentId
        });
    }
};

const collect: DropTargetCollector = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const expressionDropTarget: React.SFC<ConnectorProps> = props => {
    const classes = ['connector'];
    if (props.isOver) {
        classes.push('hovered');
    }

    return props.connectDropTarget(<div className={classes.join(' ')} />);
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(
    {
        onDropExpression: dropExpression
    },
    dispatch);

export const Connector = reduxConnect<undefined, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps);

export const BooleanExpressionConnector =
    Connector(
        DropTarget('booleanExpression', target, collect)(expressionDropTarget));

export const RealExpressionConnector =
    Connector(
        DropTarget('realExpression', target, collect)(expressionDropTarget));
