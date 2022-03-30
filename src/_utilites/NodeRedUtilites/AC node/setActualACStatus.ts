import {ACNode} from '../common node/nodeInterfaces';
import getACStatus from './getACStatus';
import logger from '../common node/logger';

const setActualACStatus = async (node: ACNode): Promise<void> => {

    try {
        getACStatus(node.IP, node.UUID).then(value => {
            node.isPowerOn = +value.ACmode > 0;
            if (node.isPowerOn) {
                node.status({fill: 'green', shape: 'dot', text: 'On'});
            } else {
                node.status({fill: 'red', shape: 'ring', text: 'Off'});
            }
            node.tempShift = value.tempShift;
            node.ACmode = value.ACmode;
            node.fanMode = value.fanMode;
            node.shuttersMode = value.shuttersMode;
        });
    } catch (err: any) {
        logger(node, `Failed to actualize AC status of ${node.UUID}: ${err.message}`);
    }

}

export default setActualACStatus;
