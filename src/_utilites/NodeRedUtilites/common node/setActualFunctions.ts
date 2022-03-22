import logger from './logger';
import {INode} from './nodeInterfaces';
import httpRequest from '../../httpRequest';
import {RCInfo} from '../../interfaces';

const setActualFunctions = async (node: INode): Promise<void> => {
    try {
        const RCInfo: RCInfo = JSON.parse( await httpRequest(node.IP, `/data/${node.UUID}`));
        node.RC.deviceInfo.Functions = RCInfo.Functions;
    } catch (err: any) {
        logger(node,`Failed to actualize saved functions of ${node.UUID}: ${err.message}`);
    }
}

export default setActualFunctions;
