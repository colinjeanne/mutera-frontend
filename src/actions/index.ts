import { createAction } from 'redux-actions';
import { Expression } from './../types/expression';
import { Gene } from './../types/gene';
import {
    BooleanExpressionId,
    GeneId,
    Id,
    RealExpressionId
} from './../types/id';
import { OutputVariable } from './../types/variable';

export interface CompleteBooleanVariablePayload {
    expressionId: BooleanExpressionId;
    variable: string;
}

export const completeBooleanVariable =
    createAction<CompleteBooleanVariablePayload>('completeBooleanVariable');

export interface CompleteConstantPayload {
    constant: number;
    expressionId: RealExpressionId;
}

export const completeConstant =
    createAction<CompleteConstantPayload>('completeConstant');

export interface CompleteGenePayload {
    geneId: GeneId;
    output: OutputVariable;
}

export const completeGene = createAction<CompleteGenePayload>('completeGene');

export interface CompleteRealVariablePayload {
    expressionId: RealExpressionId;
    variable: string;
}

export const completeRealVariable =
    createAction<CompleteRealVariablePayload>('completeRealVariable');

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
