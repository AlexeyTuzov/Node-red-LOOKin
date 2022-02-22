import { INode } from "./nodeInterfaces";
import getPowerStatus from "./getPowerStatus";

const setActualPowerStatus = async (node: INode): Promise<void> => {

    getPowerStatus(node.IP, node.UUID).then(value => {
        node.isPowerOn = value;
        if(node.isPowerOn) {
            node.status({fill: 'green', shape: 'dot', text: 'On'});
        } else {
            node.status({fill: 'grey', shape: 'ring', text: 'Off'});
        }
    });
}

export default setActualPowerStatus;