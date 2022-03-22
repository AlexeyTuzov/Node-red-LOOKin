import {INode} from './nodeInterfaces';

const logger = (node: INode, msg: string): void => {
    console.log(msg);
    node.error(msg);
}

export default logger;
