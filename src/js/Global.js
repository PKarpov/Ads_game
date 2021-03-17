import {utils} from 'pixi.js';

const mainObserver = new utils.EventEmitter();
const EVENT_HAMMER_TAP = 'HAMMER_TAP';
const EVENT_MENU_TAP = 'MENU_TAP';
const EVENT_SHOW_FINAL = 'SHOW_FINAL';
const Glob = {
    restructuring: false, //флаг для блокирования нажатия кнопок меню
    oldId: -1, // ID выбранной лестници
    width: 1270,
    height:640
};
export {mainObserver, EVENT_HAMMER_TAP, EVENT_MENU_TAP, EVENT_SHOW_FINAL, Glob};

