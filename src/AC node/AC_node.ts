import * as nodeRed from 'node-red';
import {ACNode, IConfig} from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import {Device} from '../_utilites/interfaces';
import initializeAC from '../_utilites/NodeRedUtilites/AC node/initializeAC';
import setActualCodeset from '../_utilites/NodeRedUtilites/AC node/setActualCodeset';
import setActualACStatus from '../_utilites/NodeRedUtilites/AC node/setActualACStatus';
import applyStateChange from '../_utilites/NodeRedUtilites/AC node/applyStateChange';
import sendACRequest from '../_utilites/NodeRedUtilites/AC node/sendACRequest';
import EventEmitter from 'events';

export = function (RED: nodeRed.NodeAPI) {
    RED.nodes.registerType('Air Conditioner', function (this: ACNode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;
        const initEmitter: EventEmitter | any = context.get('initEmitter');

        this.name = config.name;
        this.UUID = config.UUID;

        const onInit = async () => {
            let device: Device | any = context.get('deviceInfo');
            let remoteEvents: EventEmitter | any = context.get('remoteEvents');
            await initializeAC(this, device);

            remoteEvents.on('updated_data', async (msg: string) => {

                const DATA_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:data:${this.UUID}$`;

                if (msg.match(RegExp(DATA_UPDATE_EXPRESSION))) {
                    await setActualCodeset(this);
                    console.log('AC codeset:', this.codeset);
                }
            });

            remoteEvents.on('updated_status', async (msg: string) => {

                const STATUS_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:87:FE:${this.UUID}`;

                if (msg.match(RegExp(STATUS_UPDATE_EXPRESSION))) {
                    await setActualACStatus(this);
                    console.log('AC status:', this.ACmode, this.tempShift, this.fanMode, this.shuttersMode);
                }
            });
            console.log('AC status:', this.ACmode, this.tempShift, this.fanMode, this.shuttersMode);
            console.log('AC codeset:', this.codeset);
            console.log('REMOTE EVENTS:', remoteEvents);
        }

        initEmitter.on('initialized', onInit);

        this.on('input', async (msg, send, done) => {
            let stateChange: string = msg.payload.toString() || '';
            applyStateChange(this, stateChange);
            let command: string = `/commands/ir/ac/${this.codeset}${this.ACmode}${this.tempShift}${this.fanMode}${this.shuttersMode}`;
            await sendACRequest(this, command);
            done();
        });
    });
}
