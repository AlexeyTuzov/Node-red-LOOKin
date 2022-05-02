import {ACNode} from '../common node/nodeInterfaces';
import logger from '../common node/logger';
import getACCodeset from './getACCodeset';

const setActualCodeset = async (node: ACNode): Promise<void> => {

    await getACCodeset(node.IP, node.UUID)
        .then(value => {
            node.codeset = value || '';
        })
        .catch((err: any) => {
            logger(node, `Failed to update air conditioner ${node.UUID} code set! ${err.message}`);
        });
}

export default setActualCodeset;
