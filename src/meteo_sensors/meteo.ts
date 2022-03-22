import * as nodeRed from 'node-red';
import { INode, IConfig } from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import masterEmitter from '../_utilites/NodeRedUtilites/common node/masterEventEmitter';
import { Device } from '../_utilites/interfaces';

export = function (RED: nodeRed.NodeAPI) {
    RED.nodes.registerType ('meteo', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);
        
        let context = this.context().global;

        this.name = config.name;

        masterEmitter.on('initialized', async () => {
            let device : Device | any = context.get('deviceInfo');
        });
    });
}