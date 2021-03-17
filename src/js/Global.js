import {utils} from 'pixi.js';

export const mainObserver = new utils.EventEmitter();
export const EVENT_HAMMER_TAP = 'HAMMER_TAP';
export const EVENT_MENU_TAP = 'MENU_TAP';
export const EVENT_SHOW_FINAL = 'SHOW_FINAL';
export const Glob = {
    restructuring: false, //флаг для блокирования нажатия кнопок меню
    oldId: -1, // ID выбранной лестници
    width: 1270,
    height:640
};

