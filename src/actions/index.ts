import { createAction } from 'redux-actions';

export interface AddVariablePayload {
    dataType: 'boolean' | 'real';
    type: 'input' | 'output';
    name: string;
}

export const addVariable = createAction<AddVariablePayload>('addVariable');

export interface InsertGenePayload {
    index: number;
}

export const insertGene = createAction<InsertGenePayload>('insertGene');

export interface ShiftGenePayload {
    direction: 'up' | 'down';
    id: string;
}

export const shiftGene = createAction<ShiftGenePayload>('shiftGene');

export interface RemoveVariablePayload {
    name: string;
    type: 'input' | 'output';
}

export const removeVariable =
    createAction<RemoveVariablePayload>('removeVariable');

export const updateGene = createAction('updateGene');

export interface UpdateGenePayload {
    id: string;
    text: string;
}
