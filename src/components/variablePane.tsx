import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './../types/state';
import { Variable } from './../types/variable';
import CreateVariable from './createVariable';
import VariableList from './variableList';

interface VariableWithDataType {
    dataType: 'boolean' | 'real';
    name: string;
}

interface Props {
    inputVariables: VariableWithDataType[];
    outputVariables: VariableWithDataType[];
}

const selectVariablesByType = (
    variables: ReadonlyArray<Variable>,
    type: 'input' | 'output'
) => {
    const selected: VariableWithDataType[] = [];
    for (const { name, type: variableType, dataType} of variables) {
        if (type === variableType) {
            selected.push({
                dataType,
                name
            });
        }
    }

    return selected;
};

const variableEditor: React.SFC<Props> = props => (
    <div className='variable-pane'>
        <VariableList
            title='Input Variables'
            type='input'
            variables={props.inputVariables}
        />
        <VariableList
            title='Output Variables'
            type='output'
            variables={props.outputVariables}
        />
        <CreateVariable />
    </div>
);

const mapStateToProps = (state: State) => ({
    inputVariables: selectVariablesByType(state.variables, 'input'),
    outputVariables: selectVariablesByType(state.variables, 'output')
});

export default connect(mapStateToProps)(variableEditor);
