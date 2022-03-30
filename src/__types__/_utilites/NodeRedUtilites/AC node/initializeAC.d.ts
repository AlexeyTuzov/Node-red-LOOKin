import { ACNode } from '../common node/nodeInterfaces';
import { Device } from '../../interfaces';
declare const initializeAC: (node: ACNode, device: Device) => Promise<void>;
export default initializeAC;
