import * as nodeRed from 'node-red';
import {Device} from '../_utilites/interfaces';
import remotesTypes from '../_utilites/remotesTypes';
import {INode, IConfig} from '../_utilites/NodeRedUtilites/nodeInterfaces';
import findAppropriateRemote from '../_utilites/NodeRedUtilites/findAppropriateRemote';
import isCommandValid from '../_utilites/NodeRedUtilites/isCommandValid';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;
        let device: Device | any = context.get('deviceInfo');
        this.name = config.name;
        this.UUID = config.UUID;
        if (device) {
            this.IP = device.IP;
            this.ID = device.ID;
            findAppropriateRemote(this, device, remotesTypes.TV);
        } else {
            this.isAvailable = false;
            this.status({fill: 'grey', text:'Not Available', shape: 'ring'});
        }

        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let command: string = msg.payload.toString() || '';
            if (this.isAvailable && isCommandValid(this, command)) {
                let message: nodeRed.NodeMessage = {payload: `command '${command}' is valid and to be sent!`};
                send(message);
            }

            let params: nodeRed.NodeMessage = {
                payload: `Name: ${this.name}
                          UUID: ${this.UUID}
                          Status: ${this.isPowerOn}`
            };
            send(params);
            done();
        });
    });
}
