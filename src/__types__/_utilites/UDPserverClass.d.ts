/// <reference types="node" />
import { Device } from './interfaces';
import EventEmitter from 'events';
export declare class UDPserver {
    Device: Device;
    private readonly emitter;
    private readonly socket;
    constructor();
    start(): Promise<void>;
    halt(): void;
    getDeviceData(): Device;
    getEmitter(): EventEmitter;
}
