import * as React from 'react';
import { connect } from 'react-redux';
import {
    Action,
    bindActionCreators,
    Dispatch
} from 'redux';
import {
    updateName,
    UpdateNamePayload
} from './../actions/index';
import { State } from './../types/state';

interface MappedProps {
    name: string;
}

interface DispatchProps {
    onUpdateName: (s: UpdateNamePayload) => Action;
}

type CreatureNameProps = MappedProps & DispatchProps;

class CreatureName extends React.PureComponent<CreatureNameProps> {
    public render() {
        return (
            <div className='creature-name'>
                <input
                    onChange={this.onChange}
                    maxLength={25}
                    placeholder='Name your creature'
                    value={this.props.name}
                />
            </div>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        this.props.onUpdateName({
            name
        });
    }
}

const mapStateToProps = (state: State) => ({
    name: state.name
});

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
    bindActionCreators({
        onUpdateName: updateName
    },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreatureName);
