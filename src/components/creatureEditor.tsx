import * as React from 'react';
import CreatureName from './creatureName';
import GeneList from './geneList';
import VariablePane from './variablePane';

const creatureEditor: React.SFC = () => (
    <div>
        <CreatureName />
        <div className='editors'>
            <GeneList />
            <VariablePane />
        </div>
    </div>
);

export default creatureEditor;
