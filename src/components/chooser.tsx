import * as React from 'react';

export interface Choice {
    display: string;
    value: string;
}

interface Props {
    defaultIndex: number;
    label: string;
    onChoose: (choice: string, index: number) => void;
    options: Choice[];
}

interface State {
    index: number;
    selection: string;
}

export class Chooser extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            index: props.defaultIndex,
            selection: props.options[props.defaultIndex].value
        };

        this.handleChooseOutput = this.handleChooseOutput.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    public render() {
        const options = this.props.options.map(option => (
            <option value={option.value} key={option.value}>
                {option.display}
            </option>
        ));

        return (
            <div className='tree-chooser'>
                <label>
                    <span>
                        {this.props.label}:
                    </span>
                    <select
                        onChange={this.handleSelectionChange}
                        value={this.state.selection}
                    >
                        {options}
                    </select>
                </label>
                <button
                    className='tree-node-choice-button'
                    onClick={this.handleChooseOutput}
                    type='button'
                >
                    &#x2713;
                </button>
            </div>
        );
    }

    private handleChooseOutput() {
        this.props.onChoose(this.state.selection, this.state.index);
    }

    private handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            index: event.target.selectedIndex,
            selection: event.target.value
        });
    }
}
