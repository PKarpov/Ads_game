import {Graphics} from 'pixi.js';
import {Glob} from "./Global";

export default class Curtain extends Graphics {
    constructor(){
        super();
        this.beginFill(0)
            .drawRect(0, 0, Glob.width, Glob.height);
    }

    showCurtain() {
        this.alpha = 1;
        this.visible = true;
    }

    hideCurtain(delay) {
        if (this.tw || this.alpha === 0) return;
        this.tw = new TWEEN.Tween(this)
            .delay(delay)
            .to({alpha:0}, 500)
            .onComplete(()=>{
                this.visible = false;
                this.tw = null;
            })
            .start();
    }
}
