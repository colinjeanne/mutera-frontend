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
    dropGene,
    DropGenePayload
} from './../actions/index';
import { Gene } from './../types/gene';
import { State } from './../types/state';

interface OwnProps {
    index: number;
}

interface DispatchProps {
    onDropGene: (s: DropGenePayload) => Action;
}

interface CollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
}

type GeneInsertionPointProps = OwnProps & DispatchProps & CollectedProps;

const target: DropTargetSpec<GeneInsertionPointProps> = {
    drop(props, monitor) {
        if (!monitor) {
            return undefined;
        }

        const gene = monitor.getItem() as Gene;

        props.onDropGene({
            gene,
            index: props.index
        });
    }
};

const collect: DropTargetCollector = (connect, monitor): CollectedProps => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const geneInsertionPoint: React.SFC<GeneInsertionPointProps> = props => {
    const classes = ['gene-drop-target'];
    if (props.isOver) {
        classes.push('hovered');
    }

    return props.connectDropTarget(
        <div className={classes.join(' ')} >
            <hr />
        </div>);
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onDropGene: dropGene
    },
    dispatch);

export default reduxConnect<undefined, DispatchProps, OwnProps>(undefined, mapDispatchToProps)(
    DropTarget('gene', target, collect)(geneInsertionPoint));
