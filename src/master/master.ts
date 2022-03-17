import * as nodeRed from 'node-red';
import UDPserver from '../_utilites/UDPserver';
import {Device} from '../_utilites/interfaces';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('master', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        const savedInfo: Device | any = context.get('deviceInfo');
        if (savedInfo) {
            this.status({fill: 'green', shape: 'dot', text: 'connected'});
        } else {
            UDPserver().then((value: Device) => {
                this.status({fill: 'green', shape: 'dot', text: 'connected'});
                context.set('deviceInfo', value);
                //emit initializing function for nodes
            }).catch((err) => {
                this.log(err.stack);
            });
        }

        this.on('close', function () {
            this.status({fill: 'red', shape: 'dot', text: 'disconnected'});
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = {payload: this.name}
            send(message);
            done();
        });
    });
};
