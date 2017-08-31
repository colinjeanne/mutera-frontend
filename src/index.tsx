import * as React from 'react';
import { Provider } from 'react-redux';
import CreatureEditor from './components/creatureEditor';
import LanguageReference from './components/languageReference';
import World from './components/world';
import { store } from './store';

type Page = 'world' | 'editor' | 'language-reference';

interface State {
    page: Page;
}

export class Root extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            page: 'editor'
        };
    }

    public render() {
        let page;
        if (this.state.page === 'editor') {
            page = (
                <CreatureEditor />
            );
        } else if (this.state.page === 'language-reference') {
            page = (
                <LanguageReference />
            );
        } else if (this.state.page === 'world') {
            page = (
                <World />
            );
        }

        return (
            <Provider store={store}>
                <div className='app-root'>
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <a
                                        data-page='world'
                                        href='#'
                                        onClick={this.onNavigate}
                                    >
                                        World
                                    </a>
                                </li>
                                <li>
                                    <a
                                        data-page='editor'
                                        href='#'
                                        onClick={this.onNavigate}
                                    >
                                        Creature Editor
                                    </a>
                                </li>
                                <li>
                                    <a
                                        data-page='language-reference'
                                        href='#'
                                        onClick={this.onNavigate}
                                    >
                                        Language Reference
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    {page}
                </div>
            </Provider>
        );
    }

    private onNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const page = event.currentTarget.dataset.page as Page;
        this.setState({
            page
        });
    }
}
