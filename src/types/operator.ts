export type BooleanConnectiveOperator =
    'A' |
    'N' |
    'O';

export type BooleanOperator =
    BooleanConnectiveOperator |
    'B' |
    'G' |
    'L' |
    'T';

export type RealOperator =
    'C' |
    'D' |
    'M' |
    'P' |
    'R' |
    'S';

export const isBooleanOperator = (op: Operator): op is BooleanOperator =>
    (op === 'A') ||
    (op === 'B') ||
    (op === 'G') ||
    (op === 'L') ||
    (op === 'N') ||
    (op === 'O') ||
    (op === 'T');

export const isRealOperator = (op: Operator): op is RealOperator =>
    !isBooleanOperator(op);

export type Operator = BooleanOperator | RealOperator;
