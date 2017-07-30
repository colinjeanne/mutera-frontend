export enum BooleanInputVariable {
    isAggressive = 'aggressive',
    isBlue = 'blue',
    isFast = 'fast',
    isGreen = 'green',
    isMoving = 'moving',
    isRed = 'red',
    nearestFocusCreatureIsBlue = 'the nearest creature in front is blue',
    nearestFocusCreatureIsCarnivore = 'the nearest creature in front is a carnivore',
    nearestFocusCreatureIsGreen = 'the nearest creature in front is green',
    nearestFocusCreatureIsRed = 'the nearest creature in front is red',
    nearestLeftCreatureIsBlue = 'the nearest creature to the left is blue',
    nearestLeftCreatureIsCarnivore = 'the nearest creature to the left is a carnivore',
    nearestLeftCreatureIsGreen = 'the nearest creature to the left is green',
    nearestLeftCreatureIsRed = 'the nearest creature to the left is red',
    nearestRightCreatureIsBlue = 'the nearest creature to the right is blue',
    nearestRightCreatureIsCarnivore = 'the nearest creature to the right is a carnivore',
    nearestRightCreatureIsGreen = 'the nearest creature to the right is green',
    nearestRightCreatureIsRed = 'the nearest creature to the right is red',
    shouldDivide = 'dividing',
    shouldMate = 'trying to mate'
}

export enum BooleanOutputVariable {
    isAggressive = 'aggressive',
    isBlue = 'blue',
    isFast = 'fast',
    isGreen = 'green',
    isMoving = 'moving',
    isRed = 'red',
    shouldDivide = 'divide',
    shouldMate = 'mate'
}

type BooleanVariable = BooleanInputVariable | BooleanOutputVariable;

export enum RealInputVariable {
    age = 'my age',
    angle = 'my angle',
    angularVelocity = 'my angular velocity',
    health = 'my health',
    speed = 'my speed',
    nearestLeftPeripheryFoodDistance = 'the distance to the nearest food on the left',
    nearestRightPeripheryFoodDistance = 'the distance to the nearest food on the right',
    nearestFocusFoodDistance = 'the distance to the nearest food in front',
    nearestLeftCreatureDistance = 'the distance to the nearest creature on the left',
    nearestRightCreatureDistance = 'the distance to the nearest creature on the right',
    nearestFocusCreatureDistance = 'the distance to the nearest creature in front',
    frontSound = 'the noise level in front',
    leftSound = 'the noise level to the left',
    backSound = 'the noise level behind',
    rightSound = 'the noise level to the right',
    x = 'my longitude',
    y = 'my latitude'
}

export enum RealOutputVariable {
    angularVelocity = 'my angular velocity'
}

type RealVariable = RealInputVariable | RealOutputVariable;

export type OutputVariable = BooleanOutputVariable | RealOutputVariable;

type Variable = BooleanVariable | RealVariable;

export const isBooleanVariable = (v: Variable): v is BooleanVariable =>
    (v in BooleanInputVariable);

export const isRealVariable = (v: Variable): v is RealVariable =>
    !isBooleanVariable(v);

export const displayName = (v: Variable): string => {
    if (isBooleanVariable(v)) {
        return BooleanInputVariable[v as any];
    }

    return RealInputVariable[v as any];
};
