import { ACNode } from '../common node/nodeInterfaces';
import { Device } from '../../interfaces';
declare const findAppropriateAC: (node: ACNode, device: Device) => Promise<void>;
export default findAppropriateAC;
