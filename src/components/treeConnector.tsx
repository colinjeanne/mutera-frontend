import * as React from 'react';
import { Expression } from './../types/expression';
import { Id } from './../types/id';
import { ConnectorType } from './../types/operator';
import {
    BooleanExpressionConnector,
    RealExpressionConnector
} from './connector';
import GenericExpression from './expression/genericExpression';

interface TreeConnectorProps {
    arity: 1 | 2;
    id: Id;
    leftChild?: Expression;
    leftConnectorType: ConnectorType;
    rightChild?: Expression;
    rightConnectorType: ConnectorType;
}

const TreeConnector: React.SFC<TreeConnectorProps> = props => {
    let leftChild;
    let rightChild;
    if (props.leftChild) {
        leftChild = (
            <GenericExpression id={props.leftChild.id} />
        );
    } else if (props.leftConnectorType === 'boolean') {
        leftChild = (
            <BooleanExpressionConnector
                isLeftChild={true}
                parentId={props.id}
            />
        );
    } else {
        leftChild = (
            <RealExpressionConnector
                isLeftChild={true}
                parentId={props.id}
            />
        );
    }

    if (props.arity === 2) {
        if (props.rightChild) {
            rightChild = (
                <GenericExpression id={props.rightChild.id} />
            );
        } else if (props.rightConnectorType === 'boolean') {
            rightChild = (
                <BooleanExpressionConnector
                    isLeftChild={false}
                    parentId={props.id}
                />
            );
        } else {
            rightChild = (
                <RealExpressionConnector
                    isLeftChild={false}
                    parentId={props.id}
                />
            );
        }
    }

    return (
        <div className='connectors'>
            {leftChild}
            {rightChild}
        </div>
    );
};

export default TreeConnector;
