import EventEmitter from 'events';

export const TVemitter = new EventEmitter();
let elem: HTMLElement = document.getElementById('node-input-UUID');

console.log(elem);
TVemitter.emit('TV settings opened', elem);
