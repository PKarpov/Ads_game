import {utils} from 'pixi.js';

export const mainObserver = new utils.EventEmitter();
export const EVENT_HAMMER_TAP = 'HAMMER_TAP';
export const EVENT_MENU_TAP = 'MENU_TAP';
export const EVENT_SHOW_FINAL = 'SHOW_FINAL';
export const Glob = {value0:false, value1: -1, width: 1270, height:640};
Object.defineProperties(Glob,{
    restructurinG:{
        get() { return this.value0 },
        set(v) { this.value0 = v}
    },
    oldId:{
        get() { return this.value1 },
        set(v) { this.value1 = v}
    }
})

