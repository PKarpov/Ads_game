import { Sprite, utils } from 'pixi.js';
import Main from "../Main";

export default class Hammer extends Sprite{
    constructor() {
        super(utils.TextureCache['hammer']);
        this.anchor.set(0.5, 1);
        this.position.set(1140, 287);
        this.alpha = 0;
        this.on('pointertap', this.stopAllTweens, this, true)
            .buttonMode = true;
        this.show();
    }

    show() {
        new TWEEN.Tween(this)
            .delay(1200)
            .easing(TWEEN.Easing.Bounce.Out)
            .to({alpha: 1, y: 387}, 800)
            .onComplete(()=>{this.interactive = true})
            .start();
        this.timer = setInterval(()=>{this.knockKnock()}, 2000)
    }

    knockKnock() {
        this.stopAllTweens();
        this.tweens = [];

        let tween = new TWEEN.Tween(this)
            .to({rotation:0}, 500)
            .easing(TWEEN.Easing.Quartic.Out);
        this.tweens.unshift(tween);
        tween = new TWEEN.Tween(this)
            .to({rotation:0.5}, 100)
            .easing(TWEEN.Easing.Exponential.In)
            .chain(this.tweens[0]);
        this.tweens.unshift(tween);
        tween = new TWEEN.Tween(this)
            .to({rotation:-0.3}, 500)
            .easing(TWEEN.Easing.Bounce.Out)
            .chain(this.tweens[0]);
        this.tweens.unshift(tween);
        tween = new TWEEN.Tween(this)
            .to({rotation:0.5}, 100)
            .easing(TWEEN.Easing.Exponential.In)
            .chain(this.tweens[0])
        this.tweens.unshift(tween);
        tween = new TWEEN.Tween(this)
            .to({rotation:-0.3}, 200)
            .easing(TWEEN.Easing.Exponential.Out)
            .chain(this.tweens[0])
            .start()
    }

    stopAllTweens(ok) {
        let tween;
        while (this.tweens && this.tweens.length) {
            tween = this.tweens.shift();
            tween.stop();
            TWEEN.remove(tween);
        }
        if (ok) {
            clearInterval(this.timer);
            this.interactive = true;
            new TWEEN.Tween(this)
                .to({alpha: 0.1}, 200)
                .onComplete(()=>{
                    Main.observer.emit(Main.EVENT_HAMMER_TAP);
                    this.parent.removeChild(this)})
                .start();
        }
    }
}
