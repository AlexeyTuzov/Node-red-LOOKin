import * as nodeRed from 'node-red';
import {Device, RemoteController} from '../_utilites/interfaces';
import {INode, IConfig} from '../_utilites/NodeRedUtilites/nodeInterfaces';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);
        let context = this.context().global;
        /*
        TVemitter.on('TV settings opened', (elem: HTMLElement) => {
            let device: deviceInfo = context.get('deviceInfo');
            let TVsArray: RemoteController[] = device.deviceInfo.savedRC.filter((item: RemoteController) => item.Type === '01');
            TVsArray.forEach((item: RemoteController) => {
                appendOptionToSelector(elem, item.UUID);
            });
        });
         */

        this.name = config.name;
        this.UUID = config.UUID;
        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = {payload: context.get('deviceInfo') || ''};
            send(message);
            let params: nodeRed.NodeMessage = {payload: `Name: ${this.name} UUID: ${this.UUID}`};
            send(params);
            done();
        });
    });
}
