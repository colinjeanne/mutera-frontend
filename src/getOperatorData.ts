import { Operator } from './types/operator';

type ConnectorType = 'boolean' | 'real' | 'none';

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

const operatorArities = {
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

export default (operator: Operator) => ({
    arity: operatorArities[operator],
    connectorType: connectorTypes[operator]
});
