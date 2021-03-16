import {Container, Sprite, Texture, utils} from 'pixi.js';
import {mainObserver, EVENT_MENU_TAP, restructurinG, oldId, Glob} from "./Global";
import {addScaleXYProperties} from "./utils"

export default class Menu extends Sprite {

    constructor(id){
        super(utils.TextureCache['pad0']);
        this.anchor.set(0.5);
        this.ID = id;
        this.select = this.addChild(new Sprite(utils.TextureCache['pad1']));
        this.select.anchor.set(0.5);
        this.img = this.addChild(new Sprite(utils.TextureCache['carpet'+id]));
        this.img.anchor.set(0.5);
        addScaleXYProperties(this);
        this.scaleXY = 0.1;
        this.alpha = 0;
        this.select.alpha = 0;
        this.visible = false;
        this.on('pointertap', this.pointerTap, this)
            .buttonMode = true;
    }

    pointerTap(e) {
        if (Glob.restructurinG || this.ID === Glob.oldId) return;
        Glob.restructurinG = true;
        Glob.oldId = this.ID;
        mainObserver.emit(EVENT_MENU_TAP, this);
        new TWEEN.Tween(this.select)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(()=>{this.select.alpha})
            .to({alpha:1}, 500)
            .start();
    }
    deselect() {
        new TWEEN.Tween(this.select)
            .easing(TWEEN.Easing.Cubic.In)
            .to({alpha:0}, 500)
            .start();
    }
    show() {
         new TWEEN.Tween(this)
             .delay(400*this.ID)
             .onStart(()=>{this.visible = true})
             .easing(TWEEN.Easing.Elastic.Out)
             .to({scaleXY: 1, alpha:1}, 800)
             .onComplete(()=>{this.interactive = true})
             .start();
     }
}
