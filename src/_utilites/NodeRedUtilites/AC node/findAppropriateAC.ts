import {ACNode} from '../common node/nodeInterfaces';
import {Device, RemoteController} from '../../interfaces';
import setActualACStatus from './setActualACStatus';
import setActualCodeset from './setActualCodeset';
import logger from '../common node/logger';
import RemotesTypes from '../../remotesTypes';

const findAppropriateAC = async (node: ACNode, device: Device): Promise<void> => {

    node.RC = device.savedRC.find((item: RemoteController) =>
        item.UUID === node.UUID && item.Type === RemotesTypes.AIR_CONDITIONER);

    if (node.RC) {
        await setActualACStatus(node);
        await setActualCodeset(node);
        node.isAvailable = true;
    } else {
        logger(node, 'No Air Conditioner matches the specified UUID!');
        node.isAvailable = false;
        node.status({fill: 'grey', text: 'Not Available', shape: 'ring'});
    }
}

export default findAppropriateAC;
