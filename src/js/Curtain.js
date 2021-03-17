import {Graphics} from 'pixi.js';
import {Glob} from "./Global";

export default class Curtain extends Graphics {
    constructor(){
        super();
        this.beginFill(0)
            .drawRect(0, 0, Glob.width, Glob.height);
        this.showTime = 100000;
    }

    showCurtain() {
        if (this.tw) {
            this.tw.stop();
            TWEEN.remove(this.tw);
            this.tw = null
        }
        this.alpha = 1;
        this.visible = true;
        this.showTime = 20;
    }

    hideCurtain() {
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
