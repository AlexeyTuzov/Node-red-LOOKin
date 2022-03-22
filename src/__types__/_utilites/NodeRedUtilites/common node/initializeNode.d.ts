import { INode } from './nodeInterfaces';
import { Device } from '../../interfaces';
declare const initializeNode: (node: INode, device: Device) => Promise<void>;
export default initializeNode;
