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

export type Arity = 0 | 1 | 2;

type ArityMap = {
    [op in Operator]: Arity
};

const operatorArities: ArityMap = {
    A: 2,
    B: 0,
    C: 0,
    D: 2,
    G: 2,
    L: 2,
    M: 2,
    N: 1,
    O: 2,
    P: 2,
    R: 0,
    S: 2,
    T: 0
};

export const getOperatorArity = (op: Operator) => operatorArities[op];

export type ConnectorType = 'boolean' | 'real' | 'none';

type ConnectorMap = {
    [op in Operator]: ConnectorType
};

const connectorTypes: ConnectorMap = {
    A: 'boolean',
    B: 'none',
    C: 'none',
    D: 'real',
    G: 'real',
    L: 'real',
    M: 'real',
    N: 'boolean',
    O: 'boolean',
    P: 'real',
    R: 'none',
    S: 'real',
    T: 'none'
};

export const getOperatorConnectorType = (op: Operator) => connectorTypes[op];
