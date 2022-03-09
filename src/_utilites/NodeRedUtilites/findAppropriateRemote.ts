import {INode} from './nodeInterfaces';
import {Device, RemoteController} from '../interfaces';
import setActualPowerStatus from './setActualPowerStatus';
import logger from './logger';

const findAppropriateRemote = async (node: INode, device: Device, type: string): Promise<void> => {

    node.RC = device.savedRC.find(
        (item: RemoteController) => item.UUID === node.UUID && item.Type === type
    );
    if (node.RC) {
        setActualPowerStatus(node);
        node.isAvailable = true;
    } else {
        logger(node,'No Remote Controller matches the specified UUID!');
        node.isAvailable = false;
        node.status({fill: 'grey', text:'Not Available', shape: 'ring'});
    }
}

export default findAppropriateRemote;
