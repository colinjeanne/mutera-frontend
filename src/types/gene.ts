import {
    BooleanExpressionId,
    ExpressionId,
    GeneId
} from './id';
import { OutputVariable } from './variable';

export interface PartialGene {
    conditionId: undefined;
    expressionId: undefined;
    id: GeneId;
    output: undefined;
}

export interface Gene {
    conditionId?: BooleanExpressionId;
    expressionId?: ExpressionId;
    id: GeneId;
    output: OutputVariable;
}
