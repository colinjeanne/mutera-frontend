import * as React from 'react';
import { connect } from 'react-redux';
import {
    State,
    Variable
} from './../types/state';
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
    for (const [name, variableType, dataType] of variables) {
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
    <div className='variable-editor'>
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
    </div>
);

const mapStateToProps = (state: State) => ({
    inputVariables: selectVariablesByType(state.variables, 'input'),
    outputVariables: selectVariablesByType(state.variables, 'output')
});

export default connect(mapStateToProps)(variableEditor);
