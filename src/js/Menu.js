import {Container, Sprite, RoundedRectangle } from 'pixi.js';
import {mainObserver, EVENT_MENU_TAP, EVENT_SHOW_FINAL, EVENT_HAMMER_TAP} from "./Global";
import Button from "./Button";

export default class Menu extends Container {
    constructor(){
        super();
        this.addChild(new Button(0));
        this.addChild(new Button(1)).position.set(129, 0);
        this.addChild(new Button(2)).position.set(258, 0);
        this.ok = this.addChild(Sprite.from('./assets/ok.png'));
        this.ok.anchor.set(0.5);
        this.ok.y = 90;
        this.ok.alpha = 0;
        this.ok.hitArea = new RoundedRectangle(-70, -27, 140, 58, 12);
        this.ok.once('pointertap', ()=>{
            mainObserver.emit(EVENT_SHOW_FINAL);
            })
            .interactive = true;
        this.ok.buttonMode = true;
        // this.ok.addChild(new Graphics)
        //     .beginFill(0x00ff00,0.5)
        //     .drawRoundedRect(-70, -27, 140, 58, 12)
        mainObserver.once(EVENT_HAMMER_TAP, this.show, this);
        mainObserver.on(EVENT_MENU_TAP, this.selectNewButton, this);
    }

    selectNewButton (button){
        if(this.old) {
            this.old.deselect();
            new TWEEN.Tween(this.ok)
                .easing(TWEEN.Easing.Back.In)
                .to({x:button.x}, 500)
                .start();
        } else{
            this.ok.x = button.x;
            new TWEEN.Tween(this.ok)
                .to({alpha:1}, 500)
                .start();
        }
        this.old = button;
    }

    show(){
        for (let i = 0; i < 3; i++) {
            this.getChildAt(i).show(i * 400);
        }
        this.visible = true;
    }

}
