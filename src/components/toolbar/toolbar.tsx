import * as React from 'react';
import { BooleanExpressionButton } from './booleanExpressionButton';
import { GeneButton } from './geneButton';
import { RealExpressionButton } from './realExpressionButton';

class EditorToolbar extends React.Component {
    public render() {
        return (
            <div className='editor-toolbar'>
                <GeneButton />
                <RealExpressionButton operator='P'>
                    +
                </RealExpressionButton>
                <RealExpressionButton operator='S'>
                    -
                </RealExpressionButton>
                <RealExpressionButton operator='M'>
                    *
                </RealExpressionButton>
                <RealExpressionButton operator='D'>
                    /
                </RealExpressionButton>
                <BooleanExpressionButton operator='A'>
                    AND
                </BooleanExpressionButton>
                <BooleanExpressionButton operator='O'>
                    OR
                </BooleanExpressionButton>
                <BooleanExpressionButton operator='N'>
                    NOT
                </BooleanExpressionButton>
                <BooleanExpressionButton operator='T'>
                    True
                </BooleanExpressionButton>
                <RealExpressionButton operator='C'>
                    #
                </RealExpressionButton>
                <BooleanExpressionButton operator='B'>
                    B
                </BooleanExpressionButton>
                <RealExpressionButton operator='R'>
                    R
                </RealExpressionButton>
                <BooleanExpressionButton operator='G'>
                    {'>'}
                </BooleanExpressionButton>
                <BooleanExpressionButton operator='L'>
                    {'<'}
                </BooleanExpressionButton>
            </div>
        );
    }
}

export default EditorToolbar;
