import * as nodeRed from 'node-red';
import {Device, RemoteController} from '../_utilites/interfaces';
import appendOptionToSelector from '../_utilites/appendOptionToSelector';
//import {TVemitter} from './appendTV';

interface deviceInfo {
    deviceInfo?: Device
}

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
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
        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = {payload: context.get('deviceInfo') || ''};
            send(message);
            done();
        });
    });
}
