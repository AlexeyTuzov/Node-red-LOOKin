import * as nodeRed from 'node-red';
import UDPserver from '../_utilites/UDPserver';
import {Device} from '../_utilites/interfaces';
import masterEmitter from '../_utilites/NodeRedUtilites/common node/masterEventEmitter';


export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('Master', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        const savedInfo: Device | any = context.get('deviceInfo');
        if (savedInfo) {
            this.status({fill: 'green', shape: 'dot', text: 'connected'});
            masterEmitter.emit('initialized');
            console.log('SAVED:');
            console.log('listeners count', masterEmitter.listenerCount('initialized'));
            console.log('listeners:', masterEmitter.listeners('initialized'));
        } else {
            UDPserver().then((value: Device) => {
                this.status({fill: 'green', shape: 'dot', text: 'connected'});
                context.set('deviceInfo', value);
                masterEmitter.emit('initialized');
                console.log('SERVER STARTED:');
                console.log('listeners count', masterEmitter.listenerCount('initialized'));
                console.log('listeners:', masterEmitter.listeners('initialized'));
            }).catch((err) => {
                this.log(err.stack);
            });
        }

        this.on('close', (done) => {
            this.status({fill: 'red', shape: 'dot', text: 'disconnected'});
            console.log('close event fired! fot master node');
            done();
        });
    });
};
