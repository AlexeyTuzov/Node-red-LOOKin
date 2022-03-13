import {INode} from './nodeInterfaces';
import commandCodes from './commandCodes';
import httpRequest from '../httpRequest';
import logger from './logger';

const sendRequest = async (node: INode, command: string): Promise<void> => {

    const path: string = `/commands/ir/localremote/${node.UUID}`;
    const commandCode: string = commandCodes[command];

    const requestCheck: string = await httpRequest(node.IP, `${path}${commandCode}`);
    if (JSON.parse(requestCheck).success === 'false') {
        logger(node, `Error sending command ${command} to ${node.UUID}! No connection to remote.`);
    }
}

export default sendRequest;
