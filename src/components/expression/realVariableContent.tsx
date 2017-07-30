import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    completeRealVariable,
    CompleteRealVariablePayload
} from './../../actions/index';
import { RealVariableExpression } from './../../types/expression';
import { RealExpressionId } from './../../types/id';
import { State } from './../../types/state';
import { RealInputVariable } from './../../types/variable';
import {
    Choice,
    Chooser
} from './../chooser';
import { RealExpression } from './expression';

interface OwnProps {
    expression: RealVariableExpression;
}

interface DispatchProps {
    onCompleteRealVariable: (s: CompleteRealVariablePayload) => Action;
}

type Props = OwnProps & DispatchProps;

class RealVariableContent extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.handleChoose = this.handleChoose.bind(this);
    }

    public render() {
        const options: Choice[] = [];
        for (const variable in RealInputVariable) {
            if (variable) {
                options.push({
                    display: RealInputVariable[variable],
                    value: variable
                });
            }
        }

        return (
            <RealExpression {...this.props}>
                <Chooser
                    defaultIndex={0}
                    label='Choose a real variable'
                    onChoose={this.handleChoose}
                    options={options}
                />
            </RealExpression>
        );
    }

    private handleChoose(choice: string) {
        this.props.onCompleteRealVariable({
            expressionId: this.props.expression.id as RealExpressionId,
            variable: choice as RealInputVariable
        });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(
    {
        onCompleteRealVariable: completeRealVariable
    },
    dispatch);

export default connect<{}, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps)(RealVariableContent);
