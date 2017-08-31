import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    addVariable,
    AddVariablePayload
} from './../actions/index';
import { State } from './../types/state';
import { Variable } from './../types/variable';

interface MappedProps {
    booleanVariableCount: number;
    existingNames: string[];
    realVariableCount: number;
}

interface DispatchProps {
    onAddVariable: (s: AddVariablePayload) => Action;
}

type Props = MappedProps & DispatchProps;

interface CreateVariableState {
    dataType: 'boolean' | 'real';
    name: string;
}

const alphabetRegex = /^[a-z]$|^[a-z][a-z ]*[a-z]$/;
const isAlphabetical = (name: string) => alphabetRegex.test(name.toLowerCase());

const isUnique = (name: string, existingNames: string[]) =>
    !existingNames.includes(name.toLowerCase());

const tokenRegex = /\b(and|false|if|is|not|or|then|true)\b/;
const isTokenizable = (name: string) => !tokenRegex.test(name.toLowerCase());

class CreateVariable extends React.Component<Props, CreateVariableState> {
    private nameInput?: HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            dataType: 'real',
            name: ''
        };

        this.nameInput = undefined;
    }

    public render() {
        return (
            <div className='create-variable'>
                <div className='create-variable-title'>Add Variable</div>
                <div className='create-variable-details'>
                    <select
                        onChange={this.onSelectDataType}
                        value={this.state.dataType}
                    >
                        <option value='real'>Number</option>
                        <option value='boolean'>Boolean</option>
                    </select>
                    <input
                        maxLength={80}
                        onChange={this.onChangeName}
                        placeholder='Variable name'
                        ref={this.updateNameInput}
                        value={this.state.name}
                    />
                    <button
                        onClick={this.onAddVariable}
                        type='button'
                    >
                        Add
                    </button>
                </div>
                <div className='create-variable-status'>
                    <div>
                        <span className='variable-count'>
                            {this.props.booleanVariableCount}
                        </span>
                        {' '}/ 64 boolean variables used
                    </div>
                    <div>
                        <span className='variable-count'>
                            {this.props.realVariableCount}
                        </span>
                        {' '}/ 64 numeric variables used
                    </div>
                </div>
            </div>
        );
    }

    private onAddVariable = () => {
        if (!this.nameInput) {
            return;
        }

        if (!isAlphabetical(this.state.name)) {
            this.nameInput.setCustomValidity(
                'Names may only contain letters and spaces');
        } else if (!isUnique(this.state.name, this.props.existingNames)) {
            this.nameInput.setCustomValidity('Name already exists');
        } else if (!isTokenizable(this.state.name)) {
            this.nameInput.setCustomValidity(
                'Names must not contain keyworkds');
        } else {
            this.nameInput.setCustomValidity('');

            this.props.onAddVariable({
                ...this.state
            });

            this.setState({
                dataType: 'real',
                name: ''
            });
        }
    }

    private onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        this.setState({
            name
        });
    }

    private onSelectDataType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const dataType = event.target.value as 'boolean' | 'real';
        this.setState({
            dataType
        });
    }

    private updateNameInput = (element: HTMLInputElement) => {
        this.nameInput = element;
    }
}

const countVariablesByDataType = (
    variables: ReadonlyArray<Variable>,
    dataType: 'boolean' | 'real'
) => {
    const seenNames = new Set<string>();
    return variables.filter(variable => {
        if (seenNames.has(variable.name)) {
            return false;
        }

        seenNames.add(variable.name);
        return variable.dataType === dataType;
    }).length;
};

const selectVariableNames = (variables: ReadonlyArray<Variable>) => {
    const selected = new Set<string>(
        variables.map(({ name }) => name.toLowerCase()));
    return [...selected];
};

const mapStateToProps = (state: State) => ({
    booleanVariableCount: countVariablesByDataType(state.variables, 'boolean'),
    existingNames: selectVariableNames(state.variables),
    realVariableCount: countVariablesByDataType(state.variables, 'real')
});

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onAddVariable: addVariable
    },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateVariable);
