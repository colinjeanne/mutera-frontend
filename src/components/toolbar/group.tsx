import * as React from 'react';

interface Props {
    label: string;
}

const Group: React.SFC<Props> = props => {
    return (
        <div
            className='toolbar-group'
            type='toolbar'
        >
            <div className='toolbar-group-label'>
                {props.label}
            </div>
            <div className='toolbar-group-items'>
                {props.children}
            </div>
        </div>
    );
};

export default Group;
