import {INode} from './nodeInterfaces';
import commandCodes from './commandCodes';
import httpRequest from '../httpRequest';
import logger from './logger';

const sendRequest = async (node: INode, command: string): Promise<void> => {

    const path: string = `/commands/ir/localremote/${node.UUID}`;
    const commandCode: string = commandCodes[command];
    try {
        const requestCheck: any = await httpRequest(node.IP, `${path}${commandCode}`)
            .catch( (err: Error) => logger(node, err.message));
        if (JSON.parse(requestCheck).success === 'false') {
            logger(node, `Error sending command ${command} to ${node.UUID}! No connection to remote.`);
        }
    } catch (err: any) {
        logger(node, 'HTTP Request failed due to no connection to remote!');
    }

}

export default sendRequest;
