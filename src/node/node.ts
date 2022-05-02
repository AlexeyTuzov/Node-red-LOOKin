import * as nodeRed from 'node-red';
import {Device} from '../_utilites/interfaces';
import {INode, IConfig} from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import initializeNode from '../_utilites/NodeRedUtilites/common node/initializeNode';
import isFunctionExist from '../_utilites/NodeRedUtilites/common node/isFunctionExist';
import getCorrespondingFunction from '../_utilites/NodeRedUtilites/common node/getCorrespondingFunction';
import sendRequest from '../_utilites/NodeRedUtilites/common node/sendRequest';
import setActualPowerStatus from '../_utilites/NodeRedUtilites/common node/setActualPowerStatus';
import setActualFunctions from '../_utilites/NodeRedUtilites/common node/setActualFunctions';
import logger from '../_utilites/NodeRedUtilites/common node/logger';
import EventEmitter from 'events';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('Node', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;
        const initEmitter: EventEmitter | any = context.get('initEmitter');

        this.name = config.name;
        this.UUID = config.UUID;

        const onInit = async () => {
            let device: Device | any = context.get('deviceInfo');
            let remoteEvents: EventEmitter | any = context.get('remoteEvents');
            await initializeNode(this, device);

            remoteEvents.on('updated_data', async (msg: string) => {

                const DATA_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:data:${this.UUID}$`;

                if (msg.match(RegExp(DATA_UPDATE_EXPRESSION))) {
                    await setActualFunctions(this);
                }
            });

            remoteEvents.on('updated_status', async (msg: string) => {

                const STATUS_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:87:FE:${this.UUID}`;

                if (msg.match(RegExp(STATUS_UPDATE_EXPRESSION))) {
                    await setActualPowerStatus(this);
                }
            });
        }


        initEmitter.on('initialized', onInit);

        this.on('input', async (msg, send, done) => {
            let command: string = msg.payload.toString() || '';
            let func: string = getCorrespondingFunction(command);
            if (!func) {
                logger(this, `No function for command '${command}' found for ${this.UUID}`);
            }
            if (this.isAvailable && !!func && isFunctionExist(this, func)) {
                console.log('command to be sent:', command);
                await sendRequest(this, command);
                done();
            }
        });
    });
}
