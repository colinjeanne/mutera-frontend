import {
    BooleanExpressionId,
    GeneId,
    RealExpressionId
} from './id';

export interface Gene {
    conditionId?: BooleanExpressionId;
    expressionId?: RealExpressionId;
    id: GeneId;
}
