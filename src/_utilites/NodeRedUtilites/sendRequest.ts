import {INode} from './nodeInterfaces';
import commandCodes from './commandCodes';
import httpRequest from '../httpRequest';
import logger from './logger';

const sendRequest = async (node: INode, command: string): Promise<void> => {

    const path: string = `/commands/ir/localremote/${node.UUID}`;
    const commandCode: string = commandCodes[command];

    const requestCheck: any = await httpRequest(node.IP, `${path}${commandCode}`)
        .catch((err: Error) => logger(node, err.message));
    if (JSON.parse(requestCheck).success !== 'true') {
        logger(node, `Error sending command ${command} to ${node.UUID}! No connection to remote.`);
    }

}

export default sendRequest;
