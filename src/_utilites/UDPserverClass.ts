import dgram from 'dgram';
import sendDiscoverSignal from './sendDiscoverSignal';
import getAllDataFromRemote from './getAllDataFromRemote';
import {Device} from './interfaces';
import EventEmitter from 'events';

const PORT = 61201;
const IP = '255.255.255.255';
const ALIVE = /LOOK\.?in:Alive!/;
const UPDATED_DATA = /LOOK\.?in:Updated!\w+:data:/;
const UPDATED_STATUS = /LOOK\.?in:Updated!\w+:87:FE:/;
const UPDATED_METEO = /LOOK\.?in:Updated!\w+:FE:00:\w{8}/;
const DISCOVER = 'LOOK.in:Discover!';

export class UDPserver {
    public Device: Device;
    private readonly emitter: EventEmitter;
    private readonly socket: dgram.Socket;

    constructor() {
        this.socket = dgram.createSocket({type: 'udp4', reuseAddr: true});
        this.emitter = new EventEmitter();
    }

    public async start() {

        return new Promise<void>((resolve, reject) => {
            this.socket.on('error', err => {
                console.log('Server error', err.stack);
                reject();
            });

            this.socket.on('message', async (msg, rinfo) => {
                if (msg.toString().match(ALIVE)) {
                    let alivePayload = msg.toString().replace(ALIVE, '');
                    this.Device = await getAllDataFromRemote(alivePayload);
                    resolve();
                }
                if (msg.toString().match(UPDATED_DATA)) {
                    this.emitter.emit('updated_data', msg.toString());
                }
                if (msg.toString().match(UPDATED_STATUS)) {
                    this.emitter.emit('updated_status', msg.toString());
                }
                if (msg.toString().match(UPDATED_METEO)) {
                    this.emitter.emit('updated_meteo', msg.toString());
                }
            });

            this.socket.bind(PORT, () => {
                sendDiscoverSignal(this.socket, DISCOVER, PORT, IP);
                console.log(`Server has been started on port ${PORT}`);
            });
        });

    }

    public halt() {
        this.socket.close();
    }

    public getDeviceData() {
        return this.Device ? this.Device : null;
    }

    public getEmitter() {
        return this.emitter;
    }
}
