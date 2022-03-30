import * as nodeRed from 'node-red';
import { RemoteController } from '../../interfaces';

export interface IConfig extends nodeRed.NodeDef {
    UUID: string;
}
export interface INode extends nodeRed.Node {
    UUID: string;
    RC: RemoteController;
    isPowerOn: boolean;
    isAvailable: boolean;
    IP: string;
    ID: string;
}

export interface ACNode extends INode {
    ACmode : string;
    tempShift: string;
    fanMode: string;
    shuttersMode: string;
    codeset: string;
}

