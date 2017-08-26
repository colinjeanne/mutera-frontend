import {
    Action,
    handleActions
} from 'redux-actions';
import * as Actions from './../actions/index';
import {
    State,
    Variable
} from './../types/state';

const knownVariables: ReadonlyArray<Variable> = [
    [
        'my age',
        'input',
        'real'
    ],
    [
        'my angle',
        'input',
        'real'
    ],
    [
        'my angular velocity',
        'input',
        'real'
    ],
    [
        'my health',
        'input',
        'real'
    ],
    [
        'my speed',
        'input',
        'real'
    ],
    [
        'the distance to the nearest food to my left',
        'input',
        'real'
    ],
    [
        'the distance to the nearest food to my right',
        'input',
        'real'
    ],
    [
        'the distance to the nearest food in front of me',
        'input',
        'real'
    ],
    [
        'the distance to the nearest creature to my left',
        'input',
        'real'
    ],
    [
        'the distance to the nearest creature to my right',
        'input',
        'real'
    ],
    [
        'the distance to the nearest creature in front of me',
        'input',
        'real'
    ],
    [
        'the noise level in front of me',
        'input',
        'real'
    ],
    [
        'the noise level to the left of me',
        'input',
        'real'
    ],
    [
        'the noise level to the right of me',
        'input',
        'real'
    ],
    [
        'the noise level behind me',
        'input',
        'real'
    ],
    [
        'my longitude',
        'input',
        'real'
    ],
    [
        'my latitude',
        'input',
        'real'
    ],
    [
        'I am aggressive',
        'input',
        'boolean'
    ],
    [
        'I am moving',
        'input',
        'boolean'
    ],
    [
        'I am fast',
        'input',
        'boolean'
    ],
    [
        'I am red',
        'input',
        'boolean'
    ],
    [
        'I am green',
        'input',
        'boolean'
    ],
    [
        'I am blue',
        'input',
        'boolean'
    ],
    [
        'I am dividing',
        'input',
        'boolean'
    ],
    [
        'I am trying to mate',
        'input',
        'boolean'
    ],
    [
        'the nearest creature in front of me is a carnivore',
        'input',
        'boolean'
    ],
    [
        'the nearest creature in front of me is a red',
        'input',
        'boolean'
    ],
    [
        'the nearest creature in front of me is a green',
        'input',
        'boolean'
    ],
    [
        'the nearest creature in front of me is a blue',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the left of me is a carnivore',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the left of me is a red',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the left of me is a green',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the left of me is a blue',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the right of me is a carnivore',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the right of me is a red',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the right of me is a green',
        'input',
        'boolean'
    ],
    [
        'the nearest creature to the right of me is a blue',
        'input',
        'boolean'
    ],
    [
        'the nearest creature behind me is a carnivore',
        'input',
        'boolean'
    ],
    [
        'the nearest creature behind me is a red',
        'input',
        'boolean'
    ],
    [
        'the nearest creature behind me is a green',
        'input',
        'boolean'
    ],
    [
        'the nearest creature behind me is a blue',
        'input',
        'boolean'
    ],
    [
        'my angular velocity',
        'output',
        'real'
    ],
    [
        'I am aggressive',
        'output',
        'boolean'
    ],
    [
        'I am moving',
        'output',
        'boolean'
    ],
    [
        'I am fast',
        'output',
        'boolean'
    ],
    [
        'I am red',
        'output',
        'boolean'
    ],
    [
        'I am green',
        'output',
        'boolean'
    ],
    [
        'I am blue',
        'output',
        'boolean'
    ],
    [
        'I am dividing',
        'output',
        'boolean'
    ],
    [
        'I am trying to mate',
        'output',
        'boolean'
    ]
];

const initialState: State = {
    genes: new Map(),
    order: [],
    variables: knownVariables
};

let lastId = 1;

const makeGeneId = () => {
    return `${++lastId}`;
};

type Payloads =
    Actions.InsertGenePayload |
    Actions.ShiftGenePayload |
    Actions.UpdateGenePayload;

export const reducer = handleActions<State, Payloads>({
    insertGene: (state, action: Action<Actions.InsertGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const id = makeGeneId();
        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.set(id, '');

        const { index } = action.payload;
        const updatedOrder = [...state.order];
        updatedOrder.splice(index, 0, id);

        return {
            ...state,
            genes: updatedGenes,
            order: updatedOrder
        };
    },

    shiftGene: (state, action: Action<Actions.ShiftGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { direction, id } = action.payload;
        const index = state.order.findIndex(existing => existing === id);

        const updatedOrder = [...state.order];
        updatedOrder.splice(index, 1);
        if (direction === 'down') {
            updatedOrder.splice(index + 1, 0, id);
        } else {
            updatedOrder.splice(index - 1, 0, id);
        }

        return {
            ...state,
            order: updatedOrder
        };
    },

    updateGene: (state, action: Action<Actions.UpdateGenePayload>) => {
        if (!action.payload) {
            return state;
        }

        const { id, text } = action.payload;
        const updatedGenes = new Map(state.genes.entries());
        updatedGenes.set(id, text);

        return {
            ...state,
            genes: updatedGenes
        };
    }
}, initialState);
