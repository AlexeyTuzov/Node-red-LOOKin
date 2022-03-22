import { INode } from "./nodeInterfaces";
import getPowerStatus from "./getPowerStatus";
import logger from './logger';

const setActualPowerStatus = async (node: INode): Promise<void> => {

    try {
         getPowerStatus(node.IP, node.UUID).then(value => {
            node.isPowerOn = value;
            if(node.isPowerOn) {
                node.status({fill: 'green', shape: 'dot', text: 'On'});
            } else {
                node.status({fill: 'red', shape: 'ring', text: 'Off'});
            }
        });
    } catch (err: any) {
        logger(node,`Failed to actualize power status of ${node.UUID}: ${err.message}`);
    }

}

export default setActualPowerStatus;
