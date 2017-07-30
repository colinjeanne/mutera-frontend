import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    completeConstant,
    CompleteConstantPayload
} from './../../actions/index';
import { ConstantExpression } from './../../types/expression';
import { RealExpressionId } from './../../types/id';
import { State } from './../../types/state';
import {
    Choice,
    Chooser
} from './../chooser';
import { BooleanExpression } from './expression';

interface OwnProps {
    expression: ConstantExpression;
}

interface DispatchProps {
    onCompleteConstant: (s: CompleteConstantPayload) => Action;
}

type Props = OwnProps & DispatchProps;

class ConstantContent extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.handleChoose = this.handleChoose.bind(this);
    }

    public render() {
        const options: Choice[] = [];
        for (let i = -4; i < 4; i += 0.125) {
            const fixed = i.toFixed(3);
            options.push({
                display: fixed,
                value: fixed
            });
        }

        return (
            <BooleanExpression {...this.props}>
                <Chooser
                    defaultIndex={0}
                    label='Choose a constant'
                    onChoose={this.handleChoose}
                    options={options}
                />
            </BooleanExpression>
        );
    }

    private handleChoose(_: string, index: number) {
        this.props.onCompleteConstant({
            constant: index,
            expressionId: this.props.expression.id as RealExpressionId
        });
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(
    {
        onCompleteConstant: completeConstant
    },
    dispatch);

export default connect<{}, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps)(ConstantContent);
