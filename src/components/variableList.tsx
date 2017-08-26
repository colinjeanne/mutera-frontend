import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    addVariable,
    AddVariablePayload,
    removeVariable,
    RemoveVariablePayload
} from './../actions/index';
import { State } from './../types/state';

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
    onAddVariable: (s: AddVariablePayload) => Action;
    onRemoveVariable: (s: RemoveVariablePayload) => Action;
}

type Props = OwnProps & DispatchProps;

const variableList: React.SFC<Props> = props => {
    const rows = props.variables.map(variable => (
        <tr key={`${variable.name}|${variable.dataType}`}>
            <td>{variable.dataType}</td>
            <td>{variable.name}</td>
        </tr>
    ));

    return (
        <table className='variable-list'>
            <caption>{props.title}</caption>
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
    );
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onAddVariable: addVariable,
        onRemoveVariable: removeVariable
    },
    dispatch);

export default connect<undefined, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps)(variableList);
