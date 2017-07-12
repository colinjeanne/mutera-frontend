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
    id?: GeneId;
    type?: string;
}

interface MappedProps {
    condition?: Expression;
    expression?: Expression;
    gene?: GeneType;
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

class Gene extends React.Component<GeneProps> {
    public render() {
        const classes = ['gene', 'tree-node'];
        if (this.props.isDragging) {
            classes.push('dragged');
        }

        let condition;
        let expression;
        if (this.props.gene) {
            if (this.props.condition) {
                // Put the type in an object because React is looking for a '.'
                // in the element name when deciding if it should interpret it
                // as a variable.
                const data = {
                    type:
                        getExpressionForOperator(this.props.condition.operator)
                };

                condition = (
                    <data.type id={this.props.condition.id} />
                );
            } else {
                condition = (
                    <BooleanExpressionConnector
                        isLeftChild={true}
                        parentId={this.props.gene.id}
                    />
                );
            }

            if (this.props.expression) {
                // Put the type in an object because React is looking for a '.'
                // in the element name when deciding if it should interpret it
                // as a variable.
                const data = {
                    type:
                        getExpressionForOperator(this.props.expression.operator)
                };

                expression = (
                    <data.type id={this.props.expression.id} />
                );
            } else {
                expression = (
                    <RealExpressionConnector
                        isLeftChild={false}
                        parentId={this.props.gene.id}
                    />
                );
            }
        }

        return this.props.connectDragSource(
            <div className={classes.join(' ')}>
                <div>
                    Whenever
                </div>
                <div>
                    Set {this.props.id ? this.props.id.id : ''} to
                </div>
                <div className='connectors'>
                    {condition}
                    {expression}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps): MappedProps => {
    if (!ownProps.id) {
        return {};
    }

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
