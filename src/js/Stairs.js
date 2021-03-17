import {Container, Sprite, utils, AnimatedSprite} from 'pixi.js';
import {addScaleXYProperties} from "./utils"
import {EVENT_MENU_TAP, Glob, mainObserver} from "./Global";

export default class Stairs extends Container {
    constructor(){
        super();
        this.oldStair = this.addChild(new Sprite(utils.TextureCache['stair']));
        this.oldStair.anchor.set(0.5, 1);
        const tex = [];
        for (let i = 0; i < 3; i++) {
            tex.push(utils.TextureCache['stair' + i]);
        }
        this.newStair = this.addChild(new AnimatedSprite(tex));
        addScaleXYProperties(this.newStair);
        this.newStair.anchor.set(0.5, 1);
        this.newStair.gotoAndStop(1);
        this.newStair.visible = false;
        mainObserver.on(EVENT_MENU_TAP, this.showNewStire, this);
    }

    showNewStire(button) {
        const id = button.ID;
        this.newStair.alpha = 0;
        this.newStair.scaleY = 1.2;
        this.newStair.visible = true;
        this.newStair.gotoAndStop(id);

        new TWEEN.Tween(this.oldStair)
            .to({alpha: 0}, 300)
            .start();
        new TWEEN.Tween(this.newStair)
            .to({alpha: 1, scaleY:1}, 800)
            .easing(TWEEN.Easing.Back.Out)
            .onComplete(()=>{
                this.oldStair.texture = this.newStair.texture;
                this.oldStair.alpha = 1;
                this.newStair.visible = false;
                Glob.restructuring = false;
            })
            .start();
    }
}


