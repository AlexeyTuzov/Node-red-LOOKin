import {INode} from './nodeInterfaces';
import {Device} from '../../interfaces';
import findAppropriateRemote from './findAppropriateRemote';

const initializeNode = async (node: INode, device: Device): Promise<void> => {
    if (device) {
        node.IP = device.IP;
        node.ID = device.ID;
        await findAppropriateRemote(node, device);
    } else {
        node.isAvailable = false;
        node.status({fill: 'grey', text: 'Not Available', shape: 'ring'});
    }
}

export default initializeNode;
