import { Expression } from './../types/expression';
import { Gene } from './../types/gene';
import {
    ExpressionId,
    GeneId
} from './../types/id';

type ExpressionMap = Map<ExpressionId, Expression>;
type GeneMap = Map<GeneId, Gene>;

export interface State {
    readonly expressions: ExpressionMap;
    readonly genes: GeneMap;
    readonly order: ReadonlyArray<GeneId>;
}
