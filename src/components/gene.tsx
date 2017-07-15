import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import {
    connect as reduxConnect,
    DispatchProp
} from 'react-redux';
import { Expression } from './../types/expression';
import { Gene as GeneType } from './../types/gene';
import { GeneId } from './../types/id';
import { State } from './../types/state';
import {
    BooleanExpressionConnector,
    RealExpressionConnector
} from './connector';
import { getExpressionForOperator } from './expression';

interface OwnProps {
    id: GeneId;
    type?: string;
}

interface MappedProps {
    condition?: Expression;
    expression?: Expression;
    gene: GeneType;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type GeneProps = OwnProps & MappedProps & CollectedProps & DispatchProp<any>;

const source: DragSourceSpec<GeneProps> = {
    beginDrag(props) {
        return {
            id: props.id,
            type: props.type
        };
    }
};

const collect: DragSourceCollector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const Gene: React.SFC<GeneProps> = props => {
    const classes = ['gene', 'tree-node'];
    if (props.isDragging) {
        classes.push('dragged');
    }

    let condition;
    let expression;
    if (props.condition) {
        const Type = getExpressionForOperator(props.condition.operator);

        condition = (
            <Type id={props.condition.id} />
        );
    } else {
        condition = (
            <BooleanExpressionConnector
                isLeftChild={true}
                parentId={props.gene.id}
            />
        );
    }

    if (props.expression) {
        const Type = getExpressionForOperator(props.expression.operator);

        expression = (
            <Type id={props.expression.id} />
        );
    } else {
        expression = (
            <RealExpressionConnector
                isLeftChild={false}
                parentId={props.gene.id}
            />
        );
    }

    return props.connectDragSource(
        <div className={classes.join(' ')}>
            <div className='tree-content'>
                <div>
                    Whenever
                </div>
                <div>
                    Set {props.id.id} to
                </div>
            </div>
            <div className='connectors'>
                {condition}
                {expression}
            </div>
        </div>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    const gene = state.genes.get(ownProps.id) as GeneType;
    const condition = gene.conditionId ?
        state.expressions.get(gene.conditionId) :
        undefined;
    const expression = gene.expressionId ?
        state.expressions.get(gene.expressionId) :
        undefined;

    return {
        condition,
        expression,
        gene
    };
};

export default reduxConnect<MappedProps, undefined, OwnProps>(mapStateToProps)(
    DragSource('gene', source, collect)(Gene));
