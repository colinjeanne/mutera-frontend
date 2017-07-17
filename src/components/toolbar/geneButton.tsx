import * as React from 'react';
import {
    ConnectDragSource,
    DragSource,
    DragSourceCollector,
    DragSourceSpec
} from 'react-dnd';

interface GeneProps {
    type?: string;
}

interface CollectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

type Props = GeneProps & CollectedProps;

const source: DragSourceSpec<Props> = {
    beginDrag() {
        return {
            type: 'gene'
        };
    }
};

const collect: DragSourceCollector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const ToolbarButton: React.SFC<Props> = props => {
    const classes = ['toolbar-button'];
    if (props.isDragging) {
        classes.push('dragged');
    }

    return props.connectDragSource(
        <div className={classes.join(' ')}>
            Add Gene
        </div>
    );
};

export const GeneButton =
    DragSource<GeneProps>('gene', source, collect)(ToolbarButton);
