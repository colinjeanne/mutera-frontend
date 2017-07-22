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
    isBooleanVariable,
    OutputVariable
} from './../types/variable';
import {
    BooleanExpressionConnector,
    RealExpressionConnector
} from './connector';
import { getExpressionForOperator } from './expression';

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

interface GeneState {
    selection: OutputVariable;
}

class Gene extends React.Component<GeneProps, GeneState> {
    public constructor(props: GeneProps) {
        super(props);

        this.state = {
            selection: 'isAggressive'
        };

        this.handleChooseOutput = this.handleChooseOutput.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    public render() {
        const classes = ['gene', 'tree-node'];
        if (this.props.isDragging) {
            classes.push('dragged');
        }

        let condition;
        let expression;
        let content;

        if (this.props.gene.output) {
            if (this.props.condition) {
                const Type = getExpressionForOperator(
                    this.props.condition.operator);

                condition = (
                    <Type id={this.props.condition.id} />
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
                const Type = getExpressionForOperator(
                    this.props.expression.operator);

                expression = (
                    <Type id={this.props.expression.id} />
                );
            } else if (isBooleanVariable(this.props.gene.output)) {
                expression = (
                    <BooleanExpressionConnector
                        isLeftChild={false}
                        parentId={this.props.gene.id}
                    />
                );
            } else {
                expression = (
                    <RealExpressionConnector
                        isLeftChild={false}
                        parentId={this.props.gene.id}
                    />
                );
            }

            content = (
                <div className='tree-content'>
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

            content = (
                <div className='tree-content'>
                    <div className='gene-output-chooser'>
                        <label>
                            <span>
                                Choose an output:
                            </span>
                            <select
                                onChange={this.handleSelectionChange}
                                value={this.state.selection}
                            >
                                <option value='isAggressive'>
                                    isAggressive
                                </option>
                                <option value='isMoving'>
                                    isMoving
                                </option>
                                <option value='isFast'>
                                    isFast
                                </option>
                                <option value='isRed'>
                                    isRed
                                </option>
                                <option value='isGreen'>
                                    isGreen
                                </option>
                                <option value='isBlue'>
                                    isBlue
                                </option>
                                <option value='shouldDivide'>
                                    shouldDivide
                                </option>
                                <option value='shouldMate'>
                                    shouldMate
                                </option>
                                <option value='angularVelocity'>
                                    angularVelocity
                                </option>
                            </select>
                        </label>
                        <button
                            className='tree-node-choice-button'
                            onClick={this.handleChooseOutput}
                            type='button'
                        >
                            &#x2713;
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.connectDragSource(
            <div className={classes.join(' ')}>
                {content}
                <div className='connectors'>
                    {condition}
                    {expression}
                </div>
            </div>
        );
    }

    private handleChooseOutput() {
        this.props.onCompleteGene({
            geneId: this.props.gene.id,
            output: this.state.selection
        });
    }

    private handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            selection: event.target.value as OutputVariable
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
