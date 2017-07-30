import * as React from 'react';
import { Expression } from './../../types/expression';
import { isBooleanOperator } from './../../types/operator';
import {
    BooleanInputVariable,
    displayName,
    RealInputVariable
} from './../../types/variable';
import {
    BooleanExpression,
    RealExpression
} from './expression';

interface Props {
    expression: Expression;
    leftChild?: Expression;
    rightChild?: Expression;
}

const expressionContent = (expression: Expression): string => {
    switch (expression.operator) {
        case 'A':
            return 'and';

        case 'B':
        {
            const variable = expression.data as BooleanInputVariable;
            let text = displayName(variable);
            if (!variable.startsWith('nearest')) {
                text = `I am ${text}`;
            }

            return text;
        }

        case 'C':
        {
            const constantIndex = expression.data as number;
            return (-4 + 0.125 * constantIndex).toFixed(3);
        }

        case 'D':
            return 'divided by';

        case 'G':
            return 'is greater than';

        case 'L':
            return 'is less than';

        case 'M':
            return 'multiplied by';

        case 'N':
            return 'not';

        case 'O':
            return 'or';

        case 'P':
            return 'plus';

        case 'R':
        {
            const data = displayName(expression.data as RealInputVariable);
            return data;
        }

        case 'S':
            return 'minus';

        case 'T':
            return 'true';
    }
};

const SimpleContent: React.SFC<Props> = props => {
    const Type = isBooleanOperator(props.expression.operator) ?
        BooleanExpression :
        RealExpression;
    return (
        <Type {...props}>
            <div>
                {expressionContent(props.expression)}
            </div>
        </Type>
    );
};

export default SimpleContent;
