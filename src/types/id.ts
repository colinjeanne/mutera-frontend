export interface GeneId {
    id: number;
    type: 'gene';
}

export interface BooleanExpressionId {
    id: number;
    type: 'booleanExpression';
}

export interface RealExpressionId {
    id: number;
    type: 'realExpression';
}

export type ExpressionId = BooleanExpressionId | RealExpressionId;
export type Id = GeneId | ExpressionId;

export const isGeneId = (id: Id): id is GeneId =>
    id.type === 'gene';

export const isBooleanExpressionId = (id: Id): id is BooleanExpressionId =>
    id.type === 'booleanExpression';

export const isRealExpressionId = (id: Id): id is RealExpressionId =>
    id.type === 'realExpression';

export const areIdsEqual = (a: Id, b: Id) =>
    (a.id === b.id) && (a.type === b.type);
