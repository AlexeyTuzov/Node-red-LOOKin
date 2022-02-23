import {INode} from './nodeInterfaces';
import {Device, RemoteController} from '../interfaces';
import setActualPowerStatus from './setActualPowerStatus';

const findAppropriateRemote = async (node: INode, device: Device, type: string): Promise<void> => {

    node.RC = device.savedRC.find(
        (item: RemoteController) => item.UUID === node.UUID && item.Type === type
    );
    if (node.RC) {
        setActualPowerStatus(node);
    } else {
        console.log('No Remote Controller matches the specified UUID!');
        node.error('No Remote Controller matches the specified UUID!');
    }
}

export default findAppropriateRemote;
