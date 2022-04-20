import logger from '../common node/logger';
import { ACNode } from '../common node/nodeInterfaces';
import httpRequest from '../../httpRequest';

const sendACRequest = async (node: ACNode, command: string) => {
    const requestCheck: any = await httpRequest(node.IP, command)
        .catch((err: Error) => logger(node, err.message));
    console.log('AC node:', node);
    if (JSON.parse(requestCheck).success !== 'true') {
        logger(node, `Error sending command ${command} to air conditioner ${node.UUID}! No connection to remote.`);
    }
}

export default sendACRequest;
