type GeneMap = Map<string, string>;
export type Variable = [
    string,
    'input' | 'output',
    'boolean' | 'real'
];

export interface State {
    readonly genes: GeneMap;
    readonly order: ReadonlyArray<string>;
    readonly variables: ReadonlyArray<Variable>;
}
