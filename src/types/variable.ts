export enum BooleanInputVariable {
    isAggressive = 'isAggressive',
    isBlue = 'isBlue',
    isFast = 'isFast',
    isGreen = 'isGreen',
    isMoving = 'isMoving',
    isRed = 'isRed',
    nearestFocusCreatureIsBlue = 'nearestFocusCreatureIsBlue',
    nearestFocusCreatureIsCarnivore = 'nearestFocusCreatureIsCarnivore',
    nearestFocusCreatureIsGreen = 'nearestFocusCreatureIsGreen',
    nearestFocusCreatureIsRed = 'nearestFocusCreatureIsRed',
    nearestLeftCreatureIsBlue = 'nearestLeftCreatureIsBlue',
    nearestLeftCreatureIsCarnivore = 'nearestLeftCreatureIsCarnivore',
    nearestLeftCreatureIsGreen = 'nearestLeftCreatureIsGreen',
    nearestLeftCreatureIsRed = 'nearestLeftCreatureIsRed',
    nearestRightCreatureIsBlue = 'nearestRightCreatureIsBlue',
    nearestRightCreatureIsCarnivore = 'nearestRightCreatureIsCarnivore',
    nearestRightCreatureIsGreen = 'nearestRightCreatureIsGreen',
    nearestRightCreatureIsRed = 'nearestRightCreatureIsRed',
    shouldDivide = 'shouldDivide',
    shouldMate = 'shouldMate'
}

export enum BooleanOutputVariable {
    isAggressive = 'isAggressive',
    isBlue = 'isBlue',
    isFast = 'isFast',
    isGreen = 'isGreen',
    isMoving = 'isMoving',
    isRed = 'isRed',
    shouldDivide = 'shouldDivide',
    shouldMate = 'shouldMate'
}

type BooleanVariable = BooleanInputVariable | BooleanOutputVariable;

export enum RealInputVariable {
    age = 'age',
    angle = 'angle',
    angularVelocity = 'angularVelocity',
    health = 'health',
    speed = 'speed',
    nearestLeftPeripheryFoodDistance = 'nearestLeftPeripheryFoodDistance',
    nearestRightPeripheryFoodDistance = 'nearestRightPeripheryFoodDistance',
    nearestFocusFoodDistance = 'nearestFocusFoodDistance',
    nearestLeftCreatureDistance = 'nearestLeftCreatureDistance',
    nearestRightCreatureDistance = 'nearestRightCreatureDistance',
    nearestFocusCreatureDistance = 'nearestFocusCreatureDistance',
    frontSound = 'frontSound',
    leftSound = 'leftSound',
    backSound = 'backSound',
    rightSound = 'rightSound',
    x = 'x',
    y = 'y'
}

export enum RealOutputVariable {
    angularVelocity = 'angularVelocity'
}

type RealVariable = RealInputVariable | RealOutputVariable;

export type OutputVariable = BooleanOutputVariable | RealOutputVariable;

type Variable = BooleanVariable | RealVariable;

export const isBooleanVariable = (v: Variable): v is BooleanVariable =>
    (v in BooleanInputVariable);

export const isRealVariable = (v: Variable): v is RealVariable =>
    !isBooleanVariable(v);
