import * as nodeRed from "node-red";

export = function (RED: nodeRed.NodeAPI): void {
    RED.nodes.registerType('master', function (this: nodeRed.Node, config: nodeRed.NodeDef) {
        RED.nodes.createNode(this, config);
        let context = this.context().global;
        this.on('close', function () {
        });
    });
};
