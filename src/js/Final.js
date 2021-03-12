import {Container, Graphics, Sprite, Texture, utils} from 'pixi.js';
import Main from "../Main";
import {addScaleXYProperties} from "./utils"

export default class Final extends Container {
    constructor() {
        super();
        this.addChild(new Graphics)
            .beginFill(0, 0.7)
            .drawRect(0, 0, Main.width, Main.height);
        this.ads = this.addChild(new Sprite(utils.TextureCache['end']));
        this.ads.position.set(Main.width * 0.5, 248);
        this.ads.anchor.set(0.5);
        addScaleXYProperties(this.ads);
        this.visible = false;
        Main.observer.on(Main.EVENT_SHOW_FINAL, ()=>{this.showFinal()});
    }

    showFinal () {
        this.ads.scaleXY = 0.1;
        this.ads.alpha = 0.2;
        this.ads.rotation = 5;
        new TWEEN.Tween(this.ads)
            .easing(TWEEN.Easing.Elastic.Out)
            .to({rotation: 0, scaleXY: 1, alpha: 1}, 1500)
            .start();

        this.visible = true;
        this.interactive = true;
    }
}
