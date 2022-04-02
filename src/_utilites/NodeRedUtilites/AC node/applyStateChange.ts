import {ACNode} from '../common node/nodeInterfaces';
import logger from '../common node/logger';

const applyStateChange = (node: ACNode, msg: string): void => {
    const temp: string = msg.match(/^temp_\d{2}$/) ? msg.match(/^temp_\d{2}$/)!.toString() : '';
    const message: string = temp ? temp : msg;
    switch (message) {
        case 'off':
            node.ACmode = '0';
            break;
        case 'auto':
            node.ACmode = '1';
            break;
        case 'cool':
            node.ACmode = '2';
            break;
        case 'heat':
            node.ACmode = '3';
            break;
        case 'dry':
            node.ACmode = '4';
            break;
        case 'fan_only':
            node.ACmode = '5';
            break;
        case temp:
            let tempShift: number = +message.slice(-2) - 16;
            if (tempShift >=0 && tempShift < 16) {
                node.tempShift = tempShift.toString(16);
            } else {
                logger(node, `Temperature for air conditioner ${node.UUID} is out of range 16-31!`);
            }
            break;
        case 'fan_auto':
            node.fanMode = '0';
            break;
        case 'fan_low':
            node.fanMode = '1';
            break;
        case 'fan_mid':
            node.fanMode = '2';
            break;
        case 'fan_high':
            node.fanMode = '3';
            break;
        case 'stop':
            node.shuttersMode = '0';
            break;
        case 'move':
            node.shuttersMode = '1';
            break;
        default:
            logger(node, `Invalid command: ${msg} sent to air conditioner ${node.UUID}`);
            break;
    }
}

export default applyStateChange;
