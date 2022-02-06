/// <reference types="node" />
import dgram from 'dgram';
import { Device } from "./interfaces";
import EventEmitter from 'events';
export declare const emitter: EventEmitter;
export declare const socket: dgram.Socket;
declare const udpServer: () => Promise<Device>;
export default udpServer;
