import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Editor from './components/editor';
import EditorToolbar from './components/toolbar';
import { store } from './store';

const base = () => (
    <div className='editor-root'>
        <EditorToolbar />
        <Editor />
    </div>
);

const Context = DragDropContext(HTML5Backend)(base);

export class Root extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Context />
            </Provider>
        );
    }
}
