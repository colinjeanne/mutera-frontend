import { ConstantIndex } from './constantIndex';

export enum Token {
    And = 'and',
    CloseParenthesis = ')',
    Constant = 'constant',
    DividedBy = '/',
    False = 'false',
    GreaterThan = '>',
    If = 'if',
    Is = 'is',
    LessThan = '<',
    Minus = '-',
    MultipliedBy = '*',
    Not = 'not',
    OpenParenthesis = '(',
    Or = 'or',
    Plus = '+',
    Then = 'then',
    True = 'true',
    UnaryMinus = '--',
    Variable = 'variable'
}

export const isKnownToken = (s: string): s is Token =>
    (s === Token.And) ||
    (s === Token.CloseParenthesis) ||
    (s === Token.DividedBy) ||
    (s === Token.False) ||
    (s === Token.GreaterThan) ||
    (s === Token.If) ||
    (s === Token.Is) ||
    (s === Token.LessThan) ||
    (s === Token.Minus) ||
    (s === Token.MultipliedBy) ||
    (s === Token.Not) ||
    (s === Token.OpenParenthesis) ||
    (s === Token.Or) ||
    (s === Token.Plus) ||
    (s === Token.Then) ||
    (s === Token.True) ||
    (s === Token.UnaryMinus);

export const isKeyword = (token: Token) =>
    [
        Token.If,
        Token.Is,
        Token.Then
    ].includes(token);

export const isOperand = (token: Token) =>
    [
        Token.Constant,
        Token.False,
        Token.True,
        Token.Variable
    ].includes(token);

export const isOperator = (token: Token) =>
    [
        Token.And,
        Token.DividedBy,
        Token.GreaterThan,
        Token.LessThan,
        Token.Minus,
        Token.MultipliedBy,
        Token.Not,
        Token.Or,
        Token.Plus,
        Token.UnaryMinus
    ].includes(token);

type DatalessToken =
    Token.And |
    Token.CloseParenthesis |
    Token.DividedBy |
    Token.False |
    Token.GreaterThan |
    Token.If |
    Token.Is |
    Token.LessThan |
    Token.Minus |
    Token.MultipliedBy |
    Token.Not |
    Token.OpenParenthesis |
    Token.Or |
    Token.Plus |
    Token.Then |
    Token.True |
    Token.UnaryMinus;

interface SimpleToken {
    token: DatalessToken;
}

export interface ConstantToken {
    data: ConstantIndex;
    token: Token.Constant;
}

export interface VariableToken {
    data: string;
    token: Token.Variable;
}

export type ParsedToken = SimpleToken | ConstantToken | VariableToken;
