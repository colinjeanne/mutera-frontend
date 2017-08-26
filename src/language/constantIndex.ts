export type ConstantIndex =
     0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |
     8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |
    16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 |
    24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
    32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
    40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 |
    48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 |
    56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;

const knownConstants: number[] = [];
for (let index = 0; index < 64; ++index) {
    knownConstants.push((index / 8) - 4);
}

export const getConstantIndex = (c: number): ConstantIndex | -1 => {
    return knownConstants.findIndex(known => known === c) as ConstantIndex | -1;
};
