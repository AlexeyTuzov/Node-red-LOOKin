import { INode } from "../common node/nodeInterfaces";
import { Device } from "../../interfaces";
declare const initializeMeteo: (node: INode, device: Device) => Promise<void>;
export default initializeMeteo;
