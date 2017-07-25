import * as React from 'react';
import { connect } from 'react-redux';
import { Expression } from './../../types/expression';
import { ExpressionId } from './../../types/id';
import { State } from './../../types/state';
import BooleanVariableContent from './booleanVariableContent';
import ConstantContent from './constantContent';
import RealVariableContent from './realVariableContent';
import SimpleContent from './simpleContent';

interface OwnProps {
    id: ExpressionId;
}

interface MappedProps {
    expression: Expression;
    leftChild?: Expression;
    rightChild?: Expression;
}

type Props = OwnProps & MappedProps;

const GenericExpression: React.SFC<Props> = props => {
    if (
        (props.expression.operator === 'B') &&
        (props.expression.data === undefined)
    ) {
        return (
            <BooleanVariableContent
                expression={props.expression}
            />
        );
    } else if (
        (props.expression.operator === 'C') &&
        (props.expression.data === undefined)
    ) {
        return (
            <ConstantContent
                expression={props.expression}
            />
        );
    } else if (
        (props.expression.operator === 'R') &&
        (props.expression.data === undefined)
    ) {
        return (
            <RealVariableContent
                expression={props.expression}
            />
        );
    }

    return (
        <SimpleContent
            expression={props.expression}
            leftChild={props.leftChild}
            rightChild={props.rightChild}
        />
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    const expression = state.expressions.get(ownProps.id) as Expression;
    const leftChild = (expression.arity !== 0) && expression.leftId ?
        state.expressions.get(expression.leftId) :
        undefined;
    const rightChild = (expression.arity === 2) && expression.rightId ?
        state.expressions.get(expression.rightId) :
        undefined;

    return {
        expression,
        leftChild,
        rightChild
    };
};

export default connect(mapStateToProps, {})(GenericExpression);
