import * as nodeRed from 'node-red';
import {Device} from '../_utilites/interfaces';
import remotesTypes from '../_utilites/remotesTypes';
import {INode, IConfig} from '../_utilites/NodeRedUtilites/nodeInterfaces';
import findAppropriateRemote from '../_utilites/NodeRedUtilites/findAppropriateRemote';
import isFunctionExist from '../_utilites/NodeRedUtilites/isFunctionExist';
import getCorrespondingFunction from '../_utilites/NodeRedUtilites/getCorrespondingFunction';
import sendRequest from '../_utilites/NodeRedUtilites/sendRequest';

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
        this.on('input', async function (msg, send, done) {
            let command: string = msg.payload.toString() || '';
            let func: string = getCorrespondingFunction(command);
            if (this.isAvailable && !!func && isFunctionExist(this, func)) {
                await sendRequest(this, command);
                done();
            }
            // this is to be deleted! temporary data!
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
