import * as React from 'react';
import BodyEditor from './bodyEditor';
import CreatureName from './creatureName';
import GeneList from './geneList';
import VariablePane from './variablePane';

const creatureEditor: React.SFC = () => (
    <div className='creature-editor'>
        <CreatureName />
        <div className='editors'>
            <BodyEditor />
            <GeneList />
            <VariablePane />
        </div>
    </div>
);

export default creatureEditor;
