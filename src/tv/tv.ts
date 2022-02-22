import * as nodeRed from 'node-red';
import { Device, RemoteController } from '../_utilites/interfaces';
import setActualPowerStatus from '../_utilites/NodeRedUtilites/setActualPowerStatus';
import { INode, IConfig } from '../_utilites/NodeRedUtilites/nodeInterfaces';

enum Commands {

}

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: INode, config: IConfig) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;
        let deviceInfo: Device | any = context.get('deviceInfo');

        this.name = config.name;
        this.UUID = config.UUID;
        this.RC = deviceInfo.savedRC.find(
            (item: RemoteController) => item.UUID === this.UUID
        );
        this.IP = this.RC.IP;
        setActualPowerStatus(this);

        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = { payload: context.get('deviceInfo') || '' };
            send(message);
            let params: nodeRed.NodeMessage = { payload: `Name: ${this.name} UUID: ${this.UUID}` };
            send(params);
            done();
        });
    });
}
