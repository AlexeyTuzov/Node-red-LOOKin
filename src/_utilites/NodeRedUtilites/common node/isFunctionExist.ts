import {INode} from './nodeInterfaces';
import logger from './logger'

const isFunctionExist = (node: INode, func: string): boolean => {

    if (!node.RC.deviceInfo.Functions.find(item => item.Name === func)) {
        logger(node, `No function '${func}' found for ${node.UUID} remote controller`);
        return false;
    } else {
        return true;
    }
}

export default isFunctionExist;
