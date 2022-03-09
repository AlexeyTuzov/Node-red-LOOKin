import commandTypes from './commandTypes';
import {INode} from './nodeInterfaces';
import logger from './logger'

const isCommandValid = (node: INode, command: string): boolean => {
    if (!command) {
        logger(node, `Input command string to node ${node.UUID} is empty!`);
        return false;
    }
    if (!commandTypes[command]) {
        logger(node, `Wrong command: ${command} sent to node ${node.UUID}! Check available variants`);
        return false;
    }
    if (!node.RC.deviceInfo.Functions.find(item => item.Name === commandTypes[command])) {
        logger(node, `No function '${command}' found for ${node.UUID} remote controller`);
        return false;
    } else {
        return true;
    }
}

export default isCommandValid;
