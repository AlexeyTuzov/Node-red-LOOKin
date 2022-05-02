import * as nodeRed from 'node-red';
import {UDPserver} from '../_utilites/UDPserverClass';
import {Device} from '../_utilites/interfaces';
import EventEmitter from 'events';


export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('Master', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);

        let context = this.context().global;

        this.name = config.name;

        let initEmitter: EventEmitter = new EventEmitter();
        context.set('initEmitter', initEmitter);

        let savedInfo: Device | null = null;
        let remoteEvents: EventEmitter | null = null;

        const server = new UDPserver();
        server.start().then(() => {
            savedInfo = server.getDeviceData();
            context.set('deviceInfo', savedInfo);
            remoteEvents = server.getEmitter();
            context.set('remoteEvents', remoteEvents);
            initEmitter.emit('initialized');
            this.status({fill: 'green', shape: 'dot', text: 'connected'});
            console.log('listeners count', initEmitter.listenerCount('initialized'));
        }).catch((err) => {
            this.log(err.stack);
        });

        this.on('close', () => {
            server.halt();
            initEmitter.removeAllListeners();
            this.status({fill: 'red', shape: 'dot', text: 'disconnected'});
        });
    });
};
