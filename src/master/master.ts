import * as nodeRed from 'node-red';
import UDPserver from '../_utilites/UDPserver';
import {Device} from "../_utilites/interfaces";

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('master', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        let info = UDPserver().then( () => {
            context.set('remoteInfo', {data: 'received'})
        }).catch( (err) => {console.log(err.stack)});

        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = {payload: this.name}
            send(message);
            done();
        });
    });
};
