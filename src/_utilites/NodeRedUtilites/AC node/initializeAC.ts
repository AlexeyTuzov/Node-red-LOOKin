import {ACNode} from '../common node/nodeInterfaces';
import {Device} from '../../interfaces';
import findAppropriateAC from './findAppropriateAC';

const initializeAC = async (node: ACNode, device: Device): Promise<void> => {
    if (device) {
        node.IP = device.IP;
        node.ID = device.ID;
        await findAppropriateAC(node, device);
    } else {
        node.isAvailable = false;
        node.status({fill: 'grey', text: 'Not Available', shape: 'ring'});
    }
}

export default initializeAC;
