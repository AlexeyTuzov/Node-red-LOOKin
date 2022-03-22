import * as nodeRed from 'node-red';
import { INode, IConfig } from '../_utilites/NodeRedUtilites/common node/nodeInterfaces';
import masterEmitter from '../_utilites/NodeRedUtilites/common node/masterEventEmitter';
import { Device } from '../_utilites/interfaces';
import initializeMeteo from '../_utilites/NodeRedUtilites/meteo/initializeMeteo';
import { emitter } from '../_utilites/UDPserver';

export = function (RED: nodeRed.NodeAPI) {
    RED.nodes.registerType('Meteo Sensors', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        masterEmitter.on('initialized', async () => {
            let device: Device | any = context.get('deviceInfo');
            await initializeMeteo(this, device);
        });

        const METEO_UPDATE_EXPRESSION: string = String.raw`LOOK\.?in:Updated!${this.ID}:FE:00:\w{8}`;
        emitter.on('updated_meteo', (msg: string) => {
            if (msg.match(RegExp(METEO_UPDATE_EXPRESSION))) {
                let measuredTemp: number = parseInt(msg.slice(-8, -4), 16) / 10;
                let measuredHumidity: number = parseInt(msg.slice(-4), 16) / 10;
                let msgTemp: nodeRed.NodeMessage = { payload: `Temperature: ${measuredTemp} \u00B0C` };
                let msgHumidity: nodeRed.NodeMessage = { payload: `Humidity: ${measuredHumidity} %` };
                this.send([msgTemp, msgHumidity]);
            }
        });
    });
}