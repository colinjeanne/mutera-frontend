import * as React from 'react';
import { Provider } from 'react-redux';
import Editor from './components/editor';
import VariableEditor from './components/variableEditor';
import { store } from './store';

export class Root extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <div className='editor-root'>
                    <div className='editors'>
                        <Editor />
                        <VariableEditor />
                    </div>
                </div>
            </Provider>
        );
    }
}
