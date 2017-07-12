import * as React from 'react';
import * as Expressions from './expression';
import Gene from './gene';

class EditorToolbar extends React.Component {
    public render() {
        return (
            <div className='editor-toolbar'>
                <Gene />
                <Expressions.AdditionExpression />
                <Expressions.SubtractionExpression />
                <Expressions.MultiplicationExpression />
                <Expressions.DivisionExpression />
                <Expressions.AndExpression />
                <Expressions.OrExpression />
                <Expressions.NotExpression />
                <Expressions.TrueExpression />
                <Expressions.RealConstantExpression />
                <Expressions.BooleanVariableExpression />
                <Expressions.RealVariableExpression />
                <Expressions.GreaterThanExpression />
                <Expressions.LessThanExpression />
            </div>
        );
    }
}

export default EditorToolbar;
