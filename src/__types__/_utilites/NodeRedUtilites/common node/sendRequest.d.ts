import { INode } from './nodeInterfaces';
declare const sendRequest: (node: INode, command: string) => Promise<void>;
export default sendRequest;
