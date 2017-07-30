import {
    BooleanExpressionId,
    Id,
    RealExpressionId
} from './id';
import {
    BooleanInputVariable,
    RealInputVariable
} from './variable';

interface BaseExpression {
    operator: string;
    parentId: Id;
}

export interface BooleanVariableExpression extends BaseExpression {
    arity: 0;
    data?: BooleanInputVariable;
    id: BooleanExpressionId;
    operator: 'B';
}

export interface TrueExpression extends BaseExpression {
    arity: 0;
    id: BooleanExpressionId;
    operator: 'T';
}

type NullaryBooleanExpression =
    BooleanVariableExpression |
    TrueExpression;

export interface ConstantExpression extends BaseExpression {
    arity: 0;
    data?: number;
    id: RealExpressionId;
    operator: 'C';
}

export interface RealVariableExpression extends BaseExpression {
    arity: 0;
    data?: RealInputVariable;
    id: RealExpressionId;
    operator: 'R';
}

type NullaryRealExpression =
    ConstantExpression |
    RealVariableExpression;

interface UnaryBooleanExpression extends BaseExpression {
    arity: 1;
    id: BooleanExpressionId;
    leftId?: BooleanExpressionId;
    operator: 'N';
}

interface BinaryConnectiveExpression extends BaseExpression {
    arity: 2;
    id: BooleanExpressionId;
    leftId?: BooleanExpressionId;
    rightId?: BooleanExpressionId;
    operator: 'A' | 'O';
}

interface BinaryBooleanExpression extends BaseExpression {
    arity: 2;
    id: BooleanExpressionId;
    leftId?: RealExpressionId;
    rightId?: RealExpressionId;
    operator: 'G' | 'L';
}

interface BinaryRealExpression extends BaseExpression {
    arity: 2;
    id: RealExpressionId;
    leftId?: RealExpressionId;
    rightId?: RealExpressionId;
    operator: 'D' | 'M' | 'P' | 'S';
}

export type UnaryExpression = UnaryBooleanExpression;
export type BinaryExpression =
    BinaryBooleanExpression |
    BinaryConnectiveExpression |
    BinaryRealExpression;

export type Expression =
    NullaryBooleanExpression |
    NullaryRealExpression |
    UnaryExpression |
    BinaryExpression;
