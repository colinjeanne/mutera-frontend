import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    shiftGene,
    ShiftGenePayload,
    updateGene,
    UpdateGenePayload
} from './../actions/index';
import parse, { VariableTypes } from './../language/parse';
import {
    State,
    Variable
} from './../types/state';

interface OwnProps {
    id: string;
}

interface MappedProps {
    inputVariables: VariableTypes;
    isFirst: boolean;
    isLast: boolean;
    outputVariables: VariableTypes;
    text: string;
}

interface DispatchProps {
    onShiftGene: (s: ShiftGenePayload) => Action;
    onUpdateGene: (s: UpdateGenePayload) => Action;
}

type GeneProps = OwnProps & MappedProps & DispatchProps;

class Gene extends React.Component<GeneProps> {
    public render() {
        return (
            <div className='gene'>
                <div className='gene-controls'>
                    <button
                        disabled={this.props.isFirst}
                        onClick={this.onShiftUp}
                    >
                        {'\u25b2'}
                    </button>
                    <button
                        disabled={this.props.isLast}
                        onClick={this.onShiftDown}
                    >
                        {'\u25bc'}
                    </button>
                </div>
                <textarea
                    autoComplete='off'
                    onChange={this.onChange}
                    rows={3}
                    spellCheck={false}
                    value={this.props.text}
                />
            </div>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;

        try {
            parse(text, this.props.inputVariables, this.props.outputVariables);
            event.target.setCustomValidity('');
        } catch (e) {
            event.target.setCustomValidity(e.message);
        }

        this.props.onUpdateGene({
            id: this.props.id,
            text
        });
    }

    private onShiftDown = () => {
        this.props.onShiftGene({
            direction: 'down',
            id: this.props.id
        });
    }

    private onShiftUp = () => {
        this.props.onShiftGene({
            direction: 'up',
            id: this.props.id
        });
    }
}

const selectVariablesByType = (
    variables: ReadonlyArray<Variable>,
    type: 'input' | 'output'
) => {
    const variableTypes: VariableTypes = {};
    for (const [name, variableType, dataType] of variables) {
        if (type === variableType) {
            variableTypes[name.toLowerCase()] = dataType;
        }
    }

    return variableTypes;
};

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    const isFirst = state.order[0] === ownProps.id;
    const isLast = state.order[state.order.length - 1] === ownProps.id;
    const text = state.genes.get(ownProps.id) as string;
    return {
        inputVariables: selectVariablesByType(state.variables, 'input'),
        isFirst,
        isLast,
        outputVariables: selectVariablesByType(state.variables, 'output'),
        text
    };
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onShiftGene: shiftGene,
        onUpdateGene: updateGene
    },
    dispatch);

export default connect<MappedProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(Gene);
