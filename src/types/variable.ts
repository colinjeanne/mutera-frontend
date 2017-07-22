type BooleanVariable =
    'isAggressive' |
    'isMoving' |
    'isFast' |
    'isRed' |
    'isGreen' |
    'isBlue' |
    'shouldMate' |
    'shouldDivide';

export type BooleanInputVariable = BooleanVariable;
type BooleanOutputVariable = BooleanVariable;

export type RealInputVariable =
    'age' |
    'angle' |
    'health' |
    'speed' |
    'nearestLeftPeripheryFoodDistance' |
    'nearestRightPeripheryFoodDistance' |
    'nearestFocusFoodDistance' |
    'nearestLeftCreatureDistance' |
    'nearestLeftCreatureIsRed' |
    'nearestLeftCreatureIsGreen' |
    'nearestLeftCreatureIsBlue' |
    'nearestLeftCreatureIsCarnivore' |
    'nearestRightCreatureDistance' |
    'nearestRightCreatureIsRed' |
    'nearestRightCreatureIsGreen' |
    'nearestRightCreatureIsBlue' |
    'nearestRightCreatureIsCarnivore' |
    'nearestFocusCreatureDistance' |
    'nearestFocusCreatureIsRed' |
    'nearestFocusCreatureIsGreen' |
    'nearestFocusCreatureIsBlue' |
    'nearestFocusCreatureIsCarnivore' |
    'frontSound' |
    'leftSound' |
    'backSound' |
    'rightSound' |
    'x' |
    'y';

type RealOutputVariable = 'angularVelocity';
type RealVariable = RealInputVariable | RealOutputVariable;

export type OutputVariable = BooleanOutputVariable | RealOutputVariable;

type Variable = BooleanVariable | RealVariable;

export const isBooleanVariable = (v: Variable): v is BooleanVariable =>
    (v === 'isAggressive') ||
    (v === 'isMoving') ||
    (v === 'isFast') ||
    (v === 'isRed') ||
    (v === 'isGreen') ||
    (v === 'isBlue') ||
    (v === 'shouldMate') ||
    (v === 'shouldDivide');

export const isRealVariable = (v: Variable): v is RealVariable =>
    !isBooleanVariable(v);
