import * as nodeRed from 'node-red';
import { INode, IConfig } from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import masterEmitter from '../_utilites/NodeRedUtilites/common node/masterEventEmitter';
import { Device } from '../_utilites/interfaces';
import initializeNode from '../_utilites/NodeRedUtilites/common node/initializeNode';
import { emitter } from '../_utilites/UDPserver';
import setActualFunctions from '../_utilites/NodeRedUtilites/common node/setActualFunctions';
import setActualPowerStatus from '../_utilites/NodeRedUtilites/common node/setActualPowerStatus';

export = function (RED: nodeRed.NodeAPI) {
    RED.nodes.registerType('Air Conditioner', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        masterEmitter.on('initialized', async () => {
            let device: Device | any = context.get('deviceInfo');
            await initializeNode(this, device);
        });

        this.on('input', async (msg, send, done) => {
            let command: string = msg.payload.toString() || '';
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