import { ConstantIndex } from './constantIndex';
import {
    isOperand,
    isOperator,
    ParsedToken,
    Token,
    VariableToken
} from './token';
import tokenize from './tokenize';

export interface BooleanVariableExpression {
    data: string;
    operator: 'B';
}

export interface TrueExpression {
    operator: 'T';
}

export interface FalseExpression {
    operator: 'F';
}

type NullaryBooleanExpression =
    BooleanVariableExpression |
    TrueExpression |
    FalseExpression;

export interface ConstantExpression {
    data: ConstantIndex;
    operator: 'C';
}

export interface RealVariableExpression {
    data: string;
    operator: 'R';
}

type NullaryRealExpression =
    ConstantExpression |
    RealVariableExpression;

interface UnaryBooleanExpression {
    left: BooleanExpression;
    operator: 'N';
}

interface UnaryRealExpression {
    left: RealExpression;
    operator: 'U';
}

interface BinaryConnectiveExpression {
    left: BooleanExpression;
    right: BooleanExpression;
    operator: 'A' | 'O';
}

interface BinaryBooleanExpression {
    left: RealExpression;
    right: RealExpression;
    operator: 'G' | 'L';
}

interface BinaryRealExpression {
    left: RealExpression;
    right: RealExpression;
    operator: 'D' | 'M' | 'P' | 'S';
}

type BinaryExpression =
    BinaryConnectiveExpression |
    BinaryBooleanExpression |
    BinaryRealExpression;

type BooleanExpression =
    NullaryBooleanExpression |
    UnaryBooleanExpression |
    BinaryBooleanExpression |
    BinaryConnectiveExpression;

type RealExpression =
    NullaryRealExpression |
    UnaryRealExpression |
    BinaryRealExpression;

type Expression = BooleanExpression | RealExpression;

const isRealExpression = (expression: Expression): expression is RealExpression => {
    return [
        'C',
        'R',
        'D',
        'M',
        'P',
        'S',
        'U'
    ].includes(expression.operator);
};

interface Gene {
    condition: Expression;
    expression: Expression;
    output: string;
}

export interface VariableTypes {
    [variable: string]: 'boolean' | 'real';
}

class ParseError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const precedenceMap = {
    [Token.And]: 1,
    [Token.DividedBy]: 4,
    [Token.GreaterThan]: 2,
    [Token.LessThan]: 2,
    [Token.Minus]: 3,
    [Token.MultipliedBy]: 4,
    [Token.Not]: 5,
    [Token.Or]: 0,
    [Token.Plus]: 3,
    [Token.UnaryMinus]: 5
};

const infixToPostfix = (tokens: ParsedToken[]): ParsedToken[] => {
    const output: ParsedToken[] = [];
    const operatorStack: ParsedToken[] = [];
    for (const token of tokens) {
        if (isOperand(token.token)) {
            output.push(token);
        } else if (isOperator(token.token)) {
            const precedence = precedenceMap[token.token];
            while (
                operatorStack.length &&
                (precedenceMap[operatorStack[operatorStack.length - 1].token] >= precedence)
            ) {
                output.push(operatorStack.pop() as ParsedToken);
            }

            operatorStack.push(token);
        } else if (token.token === Token.OpenParenthesis) {
            operatorStack.push(token);
        } else if (token.token === Token.CloseParenthesis) {
            while (
                operatorStack.length &&
                (operatorStack[operatorStack.length - 1].token !== Token.OpenParenthesis)
            ) {
                output.push(operatorStack.pop() as ParsedToken);
            }

            if (!operatorStack.length) {
                throw new ParseError('Missing opening parentheses');
            }

            operatorStack.pop();
        } else {
            throw new ParseError(`Unexpected token "${token.token}"`);
        }
    }

    while (operatorStack.length) {
        const operator = operatorStack.pop() as ParsedToken;
        if (operator.token === Token.OpenParenthesis) {
            throw new ParseError('Missing closing parentheses');
        }

        output.push(operator);
    }

    return output;
};

const parseExpression = (
    tokens: ParsedToken[],
    variables: VariableTypes,
    { isReal = true }
): Expression => {
    const postfixTokens = infixToPostfix(tokens);
    const stack: Expression[] = [];

    for (const token of postfixTokens) {
        switch (token.token) {
            case Token.Constant:
                stack.push({
                    data: token.data,
                    operator: 'C'
                });
                break;

            case Token.True:
                stack.push({
                    operator: 'T'
                });
                break;

            case Token.False:
                stack.push({
                    operator: 'F'
                });
                break;

            case Token.Variable:
            {
                if (!(token.data in variables)) {
                    throw new ParseError(`Unknown variable "${token.data}"`);
                }

                const operator = (variables[token.data] === 'boolean') ?
                    'B' :
                    'R';
                stack.push({
                    data: token.data,
                    operator
                } as Expression);
                break;
            }

            case Token.Not:
            {
                if (!stack.length) {
                    throw new ParseError('Unexpected token "not"');
                }

                const operand = stack.pop() as Expression;
                if (isRealExpression(operand)) {
                    throw new ParseError(
                        'Operator "not" cannot be applied to real values');
                }

                stack.push({
                    left: operand,
                    operator: 'N'
                });
                break;
            }

            case Token.UnaryMinus:
            {
                if (!stack.length) {
                    throw new ParseError('Unexpected token "-"');
                }

                const operand = stack.pop() as Expression;
                if (!isRealExpression(operand)) {
                    throw new ParseError(
                        'Operator "-" cannot be applied to boolean values');
                }

                stack.push({
                    left: operand,
                    operator: 'U'
                });
                break;
            }

            case Token.And:
            case Token.Or:
            {
                if (stack.length < 2) {
                    throw new ParseError(`Unexpected token "${token.token}"`);
                }

                const right = stack.pop() as Expression;
                const left = stack.pop() as Expression;
                if (isRealExpression(right) || isRealExpression(left)) {
                    throw new ParseError(
                        `Operator "${token.token}" cannot be applied to real values'`);
                }

                const operator = (token.token === Token.And) ? 'A' : 'O';
                stack.push({
                    left,
                    operator,
                    right
                } as BinaryConnectiveExpression);
                break;
            }

            case Token.GreaterThan:
            case Token.LessThan:
            case Token.DividedBy:
            case Token.Minus:
            case Token.MultipliedBy:
            case Token.Plus:
            {
                if (stack.length < 2) {
                    throw new ParseError(`Unexpected token "${token.token}"`);
                }

                const right = stack.pop() as Expression;
                const left = stack.pop() as Expression;
                if (!isRealExpression(right) || !isRealExpression(left)) {
                    throw new ParseError(
                        `Operator "${token.token}" cannot be applied to boolean values'`);
                }

                let operator;
                switch (token.token) {
                    case Token.GreaterThan:
                        operator = 'G';
                        break;

                    case Token.LessThan:
                        operator = 'L';
                        break;

                    case Token.DividedBy:
                        operator = 'D';
                        break;

                    case Token.Minus:
                        operator = 'S';
                        break;

                    case Token.MultipliedBy:
                        operator = 'M';
                        break;

                    case Token.Plus:
                        operator = 'P';
                        break;
                }

                stack.push({
                    left,
                    operator,
                    right
                } as BinaryExpression);
                break;
            }
        }
    }

    if (!stack.length) {
        throw new ParseError('Empty expression');
    } else if (stack.length > 1) {
        throw new ParseError('Missing operator');
    } else if (isReal && !isRealExpression(stack[0])) {
        throw new ParseError('Expected real valued expression');
    } else if (!isReal && isRealExpression(stack[0])) {
        throw new ParseError('Expected boolean valued expression');
    }

    return stack[0];
};

const parse = (
    gene: string,
    inputVariables: VariableTypes,
    outputVariables: VariableTypes
): Gene => {
    const tokens = tokenize(gene);
    if (!tokens.length) {
        throw new ParseError('Empty gene');
    }

    let condition: Expression;
    if (tokens[0].token !== Token.If) {
        condition = {
            operator: 'T'
        };
    } else {
        const thenIndex = tokens.findIndex(token => token.token === Token.Then);
        if (thenIndex === -1) {
            throw new ParseError('Missing then');
        }

        condition = parseExpression(
            tokens.slice(1, thenIndex),
            inputVariables,
            {
                isReal: false
            });
        tokens.splice(0, thenIndex + 1);
    }

    if (!tokens.length || (tokens[0].token !== Token.Variable)) {
        throw new ParseError('Missing output variable');
    }

    const variable = (tokens.shift() as VariableToken).data;
    if (!(variable in outputVariables)) {
        throw new ParseError(`Unknown variable "${variable}"`);
    }

    const output = variable;
    let expression: Expression;
    if (outputVariables[variable] === 'boolean') {
        if (!tokens.length) {
            expression = {
                operator: 'T'
            };
        } else if (tokens[0].token === Token.IsSetTo) {
            expression = parseExpression(
                tokens.slice(1),
                inputVariables,
                {
                    isReal: false
                });
        } else {
            throw new ParseError('Missing :=');
        }
    } else {
        if (!tokens.length || (tokens[0].token !== Token.IsSetTo)) {
            throw new ParseError('Missing :=');
        }

        expression = parseExpression(
            tokens.slice(1),
            inputVariables,
            {
                isReal: true
            });
    }

    return {
        condition,
        expression,
        output
    };
};

export default parse;
