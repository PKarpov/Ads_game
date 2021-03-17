import { Container, Application, Sprite, Loader } from 'pixi.js';
import Hammer from "./js/Hammer";
import Menu from "./js/Menu";
import Stairs from "./js/Stairs";
import Final from "./js/Final";
import Curtain from "./js/Curtain";
import {mainObserver, EVENT_HAMMER_TAP, EVENT_MENU_TAP, Glob} from "./js/Global";
import {addArt, getNewSprite} from "./js/utils"

class Main {
	constructor() {
        const app = new Application({width: Glob.width, height: Glob.height, backgroundColor: 0x000000});
		document.body.appendChild(app.view);
		app.ticker.add(this.update, this);
		this.app = app;
		this.box = app.stage.addChild(new Container());
		this.box.position.set(Glob.width * 0.5, Glob.height * 0.5);
		this.main = this.box.addChild(new Container());
		this.main.position.set(-Glob.width * 0.5, -Glob.height * 0.5);
		this.main.addChildAt(Sprite.from('./assets/back.jpg'), 0);
		this.curtain = app.stage.addChild(new Curtain());
		Loader.shared.add('art', './assets/texture.json')
			.load(() => this.createRoom());
	}

	createRoom() {
		this.decor = this.main.addChild(new Container());
		addArt(
			[{png: 'dec0', x: 456, y: -43},
			{png: 'dec0', x: 1135, y: 164},
			{png: 'dec1', x: 834, y: -28},
			{png: 'dec2', x: 86, y: 110},
			{png: 'dec3', x: 201, y: 195},
			{png: 'dec4', x: 53, y: 301},
			{png: 'austin', x: 627, y: 66}],
			this.decor);

		this.menu = new Menu();
		this.menu.position.set(910, 74);

		this.stairs = new Stairs();
		this.stairs.position.set(1079, 648);

		this.main.addChild(this.stairs, this.menu, new Hammer());

		addArt([{png: 'dec', x: 1124, y:438}], this.main);

		this.main.addChild(new Final());

		this.logo = this.main.addChild(getNewSprite({png: "logo", xy: [175, 55], an: [0.5], sc: [0]}, true));
		new TWEEN.Tween(this.logo)
			.easing(TWEEN.Easing.Bounce.Out)
			.to({scaleXY: 1}, 800)
			.start();

		this.continue = this.main.addChild(getNewSprite({png: "continue", xy: [Glob.width * 0.5, 555], an: [0.5]}, true));
		this.continue.PI = 0;

		mainObserver.once(EVENT_HAMMER_TAP, this.menu.show, this.menu);
		mainObserver.on(EVENT_MENU_TAP, (button)=>{this.stairs.showNewStire(button.ID)});
		this.resize();
	}

	update() {
		TWEEN.update();
		if (this.continue) {//пульсация кнопки Continue
			this.continue.PI += 0.05;
			this.continue.scale.set(1 + Math.sin(this.continue.PI) * 0.1);
		}
		if (this.curtain.showTime-- === 0) {
			let w = window.innerWidth;
			let h = window.innerHeight;
			const kfStage = Math.min(w / Glob.width, h / Glob.height);
			this.box.scale.set((Glob.width * kfStage / w), (Glob.height * kfStage / h));
			this.curtain.hideCurtain();
		}
	}

	resize(){
		this.app.view.style.width = window.innerWidth + "px";
		this.app.view.style.height = window.innerHeight + "px";
		this.curtain.showCurtain();
	}

}
const Root = new Main();
window.addEventListener("resize", () => {
	Root.resize();
});

