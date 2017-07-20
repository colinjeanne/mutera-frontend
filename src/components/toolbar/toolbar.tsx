import * as React from 'react';
import { BooleanExpressionButton } from './booleanExpressionButton';
import { GeneButton } from './geneButton';
import Group from './group';
import { RealExpressionButton } from './realExpressionButton';

class EditorToolbar extends React.Component {
    public render() {
        return (
            <div className='editor-toolbar'>
                <Group label='Genes'>
                    <GeneButton />
                </Group>
                <Group label='Arithmetic'>
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
                    <RealExpressionButton operator='C'>
                        Constant
                    </RealExpressionButton>
                </Group>
                <Group label='Logic'>
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
                </Group>
                <Group label='Variables'>
                    <BooleanExpressionButton operator='B'>
                        Boolean
                    </BooleanExpressionButton>
                    <RealExpressionButton operator='R'>
                        Real
                    </RealExpressionButton>
                </Group>
                <Group label='Comparison'>
                    <BooleanExpressionButton operator='L'>
                        {'<'}
                    </BooleanExpressionButton>
                    <BooleanExpressionButton operator='G'>
                        {'>'}
                    </BooleanExpressionButton>
                </Group>
            </div>
        );
    }
}

export default EditorToolbar;
