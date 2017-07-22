import * as React from 'react';
import { connect } from 'react-redux';
import { Gene as GeneType } from './../types/gene';
import { GeneId } from './../types/id';
import { State } from './../types/state';
import Gene from './gene';
import GeneInsertionPoint from './geneInsertionPoint';

interface EditorProps {
    genes: GeneType[];
}

const editor: React.SFC<EditorProps> = props => {
    const children = props.genes.reduce<JSX.Element[]>((aggregate, gene, index) => {
        aggregate.push(
            <GeneInsertionPoint
                index={index}
                key={`gutter-${index}`}
            />);
        aggregate.push(
            <Gene
                id={gene.id}
                key={gene.id.type + gene.id.id}
            />);
        return aggregate;
    }, []);

    children.push(
        <GeneInsertionPoint
            index={props.genes.length}
            key={`gutter-${props.genes.length}`}
        />);

    return (
        <div className='gene-editor'>
            {children}
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    genes: state.order.map(
        (geneId: GeneId) => state.genes.get(geneId) as GeneType)
});

export default connect(mapStateToProps)(editor);
