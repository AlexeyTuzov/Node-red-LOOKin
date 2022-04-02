import * as nodeRed from 'node-red';
import { ACNode, IConfig } from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import masterEmitter from '../_utilites/NodeRedUtilites/common node/masterEventEmitter';
import { Device } from '../_utilites/interfaces';
import initializeAC from '../_utilites/NodeRedUtilites/AC node/initializeAC';
import { emitter } from '../_utilites/UDPserver';
import setActualCodeset from '../_utilites/NodeRedUtilites/AC node/setActualCodeset';
import setActualACStatus from '../_utilites/NodeRedUtilites/AC node/setActualACStatus';
import applyStateChange from '../_utilites/NodeRedUtilites/AC node/applyStateChange';
import sendACRequest from '../_utilites/NodeRedUtilites/AC node/sendACRequest';

export = function (RED: nodeRed.NodeAPI) {
    RED.nodes.registerType('Air Conditioner', function (this: ACNode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;
        this.UUID = config.UUID;

        masterEmitter.on('initialized', async () => {
            let device: Device | any = context.get('deviceInfo');
            await initializeAC(this, device);
            console.log('AC status:', this.ACmode, this.tempShift, this.fanMode, this.shuttersMode);
            console.log('AC codeset:', this.codeset);
        });

        this.on('input', async (msg, send, done) => {
            let stateChange: string = msg.payload.toString() || '';
            applyStateChange(this, stateChange);
            let command: string = `${this.codeset}${this.ACmode}${this.tempShift}`;
            await sendACRequest(this, command);
            done();
        });


        emitter.on('updated_data', async (msg: string) => {

            const DATA_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:data:${this.UUID}$`;

            if (msg.match(RegExp(DATA_UPDATE_EXPRESSION))) {
                await setActualCodeset(this);
                console.log('AC codeset:', this.codeset);
            }
        });

        emitter.on('updated_status', async (msg: string) => {

            const STATUS_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:87:FE:${this.UUID}`;

            if (msg.match(RegExp(STATUS_UPDATE_EXPRESSION))) {
                await setActualACStatus(this);
                console.log('AC status:', this.ACmode, this.tempShift, this.fanMode, this.shuttersMode);
            }
        });
    });
}
