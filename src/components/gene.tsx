import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    completeGene,
    CompleteGenePayload
} from './../actions/index';
import { Expression } from './../types/expression';
import { Gene as GeneType } from './../types/gene';
import { GeneId } from './../types/id';
import { State } from './../types/state';
import {
    BooleanOutputVariable,
    isBooleanVariable,
    OutputVariable,
    RealOutputVariable
} from './../types/variable';
import Chooser from './chooser';
import TreeConnector from './treeConnector';

interface OwnProps {
    id: GeneId;
}

interface MappedProps {
    condition?: Expression;
    expression?: Expression;
    gene: GeneType;
}

interface DispatchProps {
    onCompleteGene: (s: CompleteGenePayload) => Action;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type GeneProps = OwnProps & MappedProps & CollectedProps & DispatchProps;

const source: DragSourceSpec<GeneProps> = {
    beginDrag(props) {
        return {
            id: props.id
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
    public constructor(props: GeneProps) {
        super(props);

        this.handleChoose = this.handleChoose.bind(this);
    }

    public render() {
        const classes = ['gene', 'tree-node'];
        if (this.props.isDragging) {
            classes.push('dragged');
        }

        let connector;
        let content;

        if (this.props.gene.output) {
            const expressionConnectorType =
                isBooleanVariable(this.props.gene.output) ?
                'boolean' :
                'real';

            connector = (
                <TreeConnector
                    arity={2}
                    id={this.props.id}
                    leftChild={this.props.condition}
                    leftConnectorType='boolean'
                    rightChild={this.props.expression}
                    rightConnectorType={expressionConnectorType}
                />
            );

            content = (
                <div>
                    <div>
                        Whenever
                    </div>
                    <div>
                        Set {this.props.gene.output} to
                    </div>
                </div>
            );
        } else {
            classes.push('partial');

            const options = [];
            for (const variable in BooleanOutputVariable) {
                if (variable) {
                    options.push(variable);
                }
            }

            for (const variable in RealOutputVariable) {
                if (variable) {
                    options.push(variable);
                }
            }

            content = (
                <Chooser
                    defaultIndex={0}
                    label='Choose an output'
                    onChoose={this.handleChoose}
                    options={options}
                />
            );
        }

        return this.props.connectDragSource(
            <div className={classes.join(' ')}>
                <div className='tree-content'>
                    {content}
                </div>
                {connector}
            </div>
        );
    }

    private handleChoose(choice: string) {
        this.props.onCompleteGene({
            geneId: this.props.gene.id,
            output: choice as OutputVariable
        });
    }
}

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

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onCompleteGene: completeGene
    },
    dispatch);

export default reduxConnect<MappedProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(
    DragSource('gene', source, collect)(Gene));
