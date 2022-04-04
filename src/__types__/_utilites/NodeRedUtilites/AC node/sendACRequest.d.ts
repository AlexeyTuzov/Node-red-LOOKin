import { ACNode } from '../common node/nodeInterfaces';
declare const sendACRequest: (node: ACNode, command: string) => Promise<void>;
export default sendACRequest;
