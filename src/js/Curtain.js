import {Graphics} from 'pixi.js';
import {Glob} from "./Global";

export default class Curtain extends Graphics {
    constructor(){
        super();
        this.beginFill(0)
            .drawRect(0, 0, Glob.width, Glob.height);
    }

    showCurtain(delay = 0) {
        this.alpha = 1;
        this.visible = true;
    }

    hideCurtain(delay = 0) {
        if (this.tw || this.alpha === 0) return;
        this.tw = new TWEEN.Tween(this)
            .to({alpha:0}, 500)
            .onComplete(()=>{
                this.visible = false;
                this.tw = null;
            })
            .start();
    }
}
