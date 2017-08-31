import { Variable } from './variable';

type GeneMap = Map<string, string>;

export interface State {
    readonly genes: GeneMap;
    readonly name: string;
    readonly order: ReadonlyArray<string>;
    readonly variables: ReadonlyArray<Variable>;
}
