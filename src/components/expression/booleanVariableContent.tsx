import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    completeBooleanVariable,
    CompleteBooleanVariablePayload
} from './../../actions/index';
import { BooleanVariableExpression } from './../../types/expression';
import { BooleanExpressionId } from './../../types/id';
import { State } from './../../types/state';
import { BooleanInputVariable } from './../../types/variable';
import Chooser from './../chooser';
import { BooleanExpression } from './expression';

interface OwnProps {
    expression: BooleanVariableExpression;
}

interface DispatchProps {
    onCompleteBooleanVariable: (s: CompleteBooleanVariablePayload) => Action;
}

type Props = OwnProps & DispatchProps;

class BooleanVariableContent extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.handleChoose = this.handleChoose.bind(this);
    }

    public render() {
        const options = [];
        for (const variable in BooleanInputVariable) {
            if (variable) {
                options.push(variable);
            }
        }

        return (
            <BooleanExpression {...this.props}>
                <Chooser
                    defaultIndex={0}
                    label='Choose a boolean variable'
                    onChoose={this.handleChoose}
                    options={options}
                />
            </BooleanExpression>
        );
    }

    private handleChoose(choice: string) {
        this.props.onCompleteBooleanVariable({
            expressionId: this.props.expression.id as BooleanExpressionId,
            variable: choice
        });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(
    {
        onCompleteBooleanVariable: completeBooleanVariable
    },
    dispatch);

export default connect<{}, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps)(BooleanVariableContent);
