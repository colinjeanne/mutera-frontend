import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './../types/state';
import Gene from './gene';
import GeneInsertionPoint from './geneInsertionPoint';

interface EditorProps {
    genes: ReadonlyArray<string>;
}

const editor: React.SFC<EditorProps> = props => {
    const children = props.genes.reduce<JSX.Element[]>((aggregate, id, index) => {
        aggregate.push(
            <GeneInsertionPoint
                index={index}
                key={`gutter-${index}`}
            />);
        aggregate.push(
            <Gene
                id={id}
                key={id}
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
    genes: state.order
});

export default connect(mapStateToProps)(editor);
