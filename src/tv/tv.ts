import * as nodeRed from 'node-red';
import {Device} from '../_utilites/interfaces';
import remotesTypes from '../_utilites/remotesTypes';
import {INode, IConfig} from '../_utilites/NodeRedUtilites/nodeInterfaces';
import findAppropriateRemote from '../_utilites/NodeRedUtilites/findAppropriateRemote';
import isFunctionExist from '../_utilites/NodeRedUtilites/isFunctionExist';
import getCorrespondingFunction from '../_utilites/NodeRedUtilites/getCorrespondingFunction';
import sendRequest from '../_utilites/NodeRedUtilites/sendRequest';
import {emitter} from '../_utilites/UDPserver';
import setActualPowerStatus from '../_utilites/NodeRedUtilites/setActualPowerStatus';
import setActualFunctions from '../_utilites/NodeRedUtilites/setActualFunctions';
import logger from '../_utilites/NodeRedUtilites/logger';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;
        let device: Device | any = context.get('deviceInfo');
        this.name = config.name;
        this.UUID = config.UUID;
        //--------------------------------------------------
        // create standalone function 'initialize NODE'
        // add event listener imported from master NODE
        if (device) {
            this.IP = device.IP;
            this.ID = device.ID;
            findAppropriateRemote(this, device, remotesTypes.TV);
        } else {
            this.isAvailable = false;
            this.status({fill: 'grey', text: 'Not Available', shape: 'ring'});
        }
        //---------------------------------------------------
        this.on('close', function () {

        });
        this.on('input', async function (msg, send, done) {
            let command: string = msg.payload.toString() || '';
            let func: string = getCorrespondingFunction(command);
            if (!func) {
                logger(this, `No function for command '${command}' found for ${this.UUID}`);
            }
            if (this.isAvailable && !!func && isFunctionExist(this, func)) {
                await sendRequest(this, command);
                done();
            }
        });

        const DATA_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:data:${this.UUID}$`;
        emitter.on('updated_data', async (msg: string) => {
            if (msg.match(RegExp(DATA_UPDATE_EXPRESSION))) {
                await setActualFunctions(this);
            }
        });

        const STATUS_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:87:FE:${this.UUID}`;
        emitter.on('updated_status', async (msg: string) => {
            if (msg.match(RegExp(STATUS_UPDATE_EXPRESSION))) {
                await setActualPowerStatus(this);
            }
        });

    });
}
