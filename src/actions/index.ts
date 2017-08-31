import { createAction } from 'redux-actions';

export interface AddVariablePayload {
    dataType: 'boolean' | 'real';
    name: string;
}

export const addVariable = createAction<AddVariablePayload>('addVariable');

export interface InsertGenePayload {
    index: number;
}

export const insertGene = createAction<InsertGenePayload>('insertGene');

export interface RemoveGenePayload {
    id: string;
}

export const removeGene =
    createAction<RemoveGenePayload>('removeGene');

export interface RemoveVariablePayload {
    name: string;
    type: 'input' | 'output';
}

export const removeVariable =
    createAction<RemoveVariablePayload>('removeVariable');

export interface ShiftGenePayload {
    direction: 'up' | 'down';
    id: string;
}

export const shiftGene = createAction<ShiftGenePayload>('shiftGene');

export interface UpdateGenePayload {
    id: string;
    text: string;
}

export const updateGene = createAction<UpdateGenePayload>('updateGene');

export interface UpdateNamePayload {
    name: string;
}

export const updateName = createAction<UpdateNamePayload>('updateName');
