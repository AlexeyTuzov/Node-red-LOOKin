import * as nodeRed from 'node-red';

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('tv', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);
        let context = this.context().global;
        this.name = config.name;
        this.on('close', function () {
        });
        this.on('input', function (msg, send, done) {
            let message: nodeRed.NodeMessage = {payload: context.get('remoteInfo') || ''};
            send(message);
            done();
        });
    });
}
