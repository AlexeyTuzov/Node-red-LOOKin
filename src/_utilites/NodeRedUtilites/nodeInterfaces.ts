import * as nodeRed from 'node-red';

export interface IConfig extends nodeRed.NodeDef {
    UUID: string;
}
export interface INode extends nodeRed.Node {
    UUID: string
}
