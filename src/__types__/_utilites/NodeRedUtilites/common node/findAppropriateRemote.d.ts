import { INode } from './nodeInterfaces';
import { Device } from '../../interfaces';
declare const findAppropriateRemote: (node: INode, device: Device) => Promise<void>;
export default findAppropriateRemote;
