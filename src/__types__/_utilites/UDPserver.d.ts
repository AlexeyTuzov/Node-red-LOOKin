/// <reference types="node" />
import { Device } from './interfaces';
import EventEmitter from 'events';
export declare const emitter: EventEmitter;
declare const udpServer: () => Promise<Device>;
export default udpServer;
