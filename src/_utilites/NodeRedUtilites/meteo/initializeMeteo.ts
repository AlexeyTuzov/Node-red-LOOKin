import { INode } from "../common node/nodeInterfaces";
import { Device, DeviceFullInfo } from "../../interfaces";
import httpRequest from "../../httpRequest";
import logger from '../common node/logger';

const initializeMeteo = async (node: INode, device: Device) => {
    if (device) {
        node.IP = device.IP;
        node.ID = device.ID;
        let deviceFullInfo: DeviceFullInfo = JSON.parse( await httpRequest(node.IP, '/device')); 
        let version: number = parseInt(deviceFullInfo.MRDC.slice(0, 2));
        if (version < 2) {
            node.isAvailable = false;
            node.status({fill: 'grey', shape: 'ring', text: 'Not supported'});
            logger(node, 'Meteo sensors are not supported by this version of remote');
        } else {
            node.isAvailable = true;
            node.status({fill: 'green', shape: 'dot', text: 'Connected'});
        }
    } else {
        node.isAvailable = false;
        node.status({fill: 'grey', shape: 'ring', text: 'Not Available'});
    }
}

export default initializeMeteo;