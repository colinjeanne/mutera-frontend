import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    insertGene,
    InsertGenePayload
} from './../actions/index';
import { State } from './../types/state';

interface OwnProps {
    index: number;
}

interface DispatchProps {
    onInsertGene: (s: InsertGenePayload) => Action;
}

type GeneInsertionPointProps = OwnProps & DispatchProps;

class GeneInsertionPoint extends React.PureComponent<GeneInsertionPointProps> {
    public render() {
        return (
            <button
                className='gene-insertion-point'
                onClick={this.onInsertGene}
            >
                <span>Insert gene</span>
            </button>
        );
    }

    private onInsertGene = () => {
        this.props.onInsertGene({
            index: this.props.index
        });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onInsertGene: insertGene
    },
    dispatch);

export default connect<undefined, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps
)(GeneInsertionPoint);
