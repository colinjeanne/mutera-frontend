import {
    BooleanExpressionId,
    Id,
    RealExpressionId
} from './id';

interface BaseExpression {
    operator: string;
    parentId: Id;
}

interface NullaryBooleanExpression extends BaseExpression {
    arity: 0;
    data: boolean;
    id: BooleanExpressionId;
    operator: 'B' | 'T';
}

interface NullaryRealExpression extends BaseExpression {
    arity: 0;
    data: number;
    id: RealExpressionId;
    operator: 'C' | 'R';
}

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
    BinaryBooleanExpression |
    BinaryRealExpression;
