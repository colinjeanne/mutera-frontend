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
import {
    Id,
    isGeneId
} from './../types/id';
import { State } from './../types/state';

interface OwnProps {
    isLeftChild: boolean;
    parentId: Id;
}

interface MappedProps {
    ancestors: Id[];
}

interface DispatchProps {
    onDropExpression: (s: DropExpressionPayload) => Action;
}

interface CollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
}

type ConnectorProps = OwnProps & MappedProps & DispatchProps & CollectedProps;

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
    },

    canDrop(props, monitor) {
        if (!monitor) {
            return false;
        }

        const expression = monitor.getItem() as Expression;
        return !props.ancestors.includes(expression.id);
    }
};

const collect: DropTargetCollector = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop()
});

const expressionDropTarget: React.SFC<ConnectorProps> = props => {
    const classes = ['connector'];
    if (props.isOver) {
        classes.push('hovered');
    }

    return props.connectDropTarget(<div className={classes.join(' ')} />);
};

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    const ancestors: Id[] = [];

    let ancestorId = ownProps.parentId;
    while (ancestorId) {
        ancestors.push(ancestorId);

        if (isGeneId(ancestorId)) {
            break;
        }

        const ancestor = state.expressions.get(ancestorId) as Expression;
        ancestorId = ancestor.parentId;
    }

    return {
        ancestors
    };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(
    {
        onDropExpression: dropExpression
    },
    dispatch);

export const Connector = reduxConnect<MappedProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps);

export const BooleanExpressionConnector =
    Connector(
        DropTarget('booleanExpression', target, collect)(expressionDropTarget));

export const RealExpressionConnector =
    Connector(
        DropTarget('realExpression', target, collect)(expressionDropTarget));
