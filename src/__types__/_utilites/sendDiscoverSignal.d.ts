import dgram from 'dgram';
declare const sendDiscoverSignal: (socket: dgram.Socket, msg: string, port: number, ip: string) => void;
export default sendDiscoverSignal;
