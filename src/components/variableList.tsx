import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    removeVariable,
    RemoveVariablePayload
} from './../actions/index';
import knownVariables from './../knownVariables';
import { State } from './../types/state';

const knownVariableNames = knownVariables.map(({ name }) => name.toLowerCase());

interface VariableWithDataType {
    dataType: 'boolean' | 'real';
    name: string;
}

interface OwnProps {
    title: string;
    type: 'input' | 'output';
    variables: VariableWithDataType[];
}

interface DispatchProps {
    onRemoveVariable: (s: RemoveVariablePayload) => Action;
}

type Props = OwnProps & DispatchProps;

interface VariableListState {
    search?: string;
    selectedVariableName?: string;
}

class VariableList extends React.Component<Props, VariableListState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedVariableName: undefined
        };
    }

    public render() {
        const rows = this.props.variables.
            filter(({ name }) =>
                !this.state.search ||
                name.toLowerCase().includes(this.state.search.toLowerCase())).
            map(variable => {
                const name = variable.name.toLowerCase();
                const classes =
                    (name === this.state.selectedVariableName) ?
                    'selected' :
                    '';

                return (
                    <tr
                        className={classes}
                        data-name={name}
                        key={`${variable.name}|${variable.dataType}`}
                        onClick={this.onSelectVariable}
                    >
                        <td>
                            {variable.dataType === 'real' ? 'Number' : 'Boolean'}
                        </td>
                        <td>
                            {variable.name}
                        </td>
                    </tr>
                );
            });

        const isRemoveDisabled = !this.state.selectedVariableName ||
            knownVariableNames.includes(this.state.selectedVariableName);

        return (
            <div className='variable-list'>
                <table>
                    <caption>{this.props.title}</caption>
                    <thead>
                        <tr>
                            <td>Type</td>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className='variable-list-controls'>
                    <input
                        onChange={this.onSearch}
                        placeholder='Find variable name'
                        type='search'
                        value={this.state.search}
                    />
                    <button
                        disabled={isRemoveDisabled}
                        onClick={this.onRemoveVariable}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }

    private onRemoveVariable = () => {
        if (this.state.selectedVariableName) {
            this.props.onRemoveVariable({
                name: this.state.selectedVariableName,
                type: this.props.type
            });

            this.setState({
                selectedVariableName: undefined
            });
        }
    }

    private onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        const isSelectionFiltered = !this.state.selectedVariableName ||
            !this.state.selectedVariableName.includes(search.toLowerCase());
        const selectedVariableName = isSelectionFiltered ?
            undefined :
            this.state.selectedVariableName;

        this.setState({
            search,
            selectedVariableName
        });
    }

    private onSelectVariable = (event: React.MouseEvent<HTMLTableRowElement>) => {
        this.setState({
            selectedVariableName: event.currentTarget.dataset.name
        });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onRemoveVariable: removeVariable
    },
    dispatch);

export default connect<undefined, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps)(VariableList);
