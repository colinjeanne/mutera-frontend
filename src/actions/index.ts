import { createAction } from 'redux-actions';
import { Expression } from './../types/expression';
import { Gene } from './../types/gene';
import { Id } from './../types/id';

export interface DropGenePayload {
    gene: Gene;
    index: number;
}

export const dropGene = createAction<DropGenePayload>('dropGene');

export interface DropExpressionPayload {
    isLeftChild: boolean;
    expression: Expression;
    parentId: Id;
}

export const dropExpression =
    createAction<DropExpressionPayload>('dropExpression');
