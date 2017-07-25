import * as React from 'react';
import { Expression } from './../../types/expression';
import { isBooleanOperator } from './../../types/operator';
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
            return 'AND';

        case 'B':
        {
            const data = expression.data as string;
            return data;
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
            return 'NOT';

        case 'O':
            return 'OR';

        case 'P':
            return 'plus';

        case 'R':
        {
            const data = expression.data as string;
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
