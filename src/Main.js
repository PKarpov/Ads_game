import { Container, Application, Sprite, utils, Loader } from 'pixi.js';
import Hammer from "./js/Hammer";
import Menu from "./js/Menu";
import Stairs from "./js/Stairs";
import Final from "./js/Final";
import Curtain from "./js/Curtain";
import {mainObserver, EVENT_HAMMER_TAP, EVENT_MENU_TAP, Glob} from "./js/Global";
import {addArt, getNewSprite} from "./js/utils"

export default class Main {
	constructor() {
        const app = new Application({width: Glob.width, height: Glob.height, backgroundColor: 0x000000});
		document.body.appendChild(app.view);
		app.ticker.add(this.update, this);
		this.app = app;
		this.box = app.stage.addChild(new Container());
		this.box.position.set(Glob.width * 0.5, Glob.height * 0.5);
		this.main = this.box.addChild(new Container());
		this.main.addChildAt(Sprite.from('./assets/back.jpg'), 0);
		this.main.position.set(-Glob.width * 0.5, -Glob.height * 0.5);
		this.curtain = app.stage.addChild(new Curtain());
		this.dark = 0;

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
		mainObserver.once(EVENT_HAMMER_TAP, this.menu.show, this.menu);
		mainObserver.on(EVENT_MENU_TAP, (button)=>{this.stairs.showNewStire(button.ID)});

		this.main.addChild(this.stairs, this.menu);

		this.main.addChild(new Hammer);

		addArt([{png: 'dec', x: 1124, y:438}], this.main);

		this.main.addChild(new Final());

		// addArt([{png: 'logo',, name:'logo'}], this.main);
		this.logo = this.main.addChild(getNewSprite({png: "logo", xy: [175, 55], an: [0.5], sc: [0]}, true));
		new TWEEN.Tween(this.logo)
			.delay(400)
			.easing(TWEEN.Easing.Bounce.Out)
			.to({scaleXY: 1}, 800)
			.start();

		this.continue = this.main.addChild(new Sprite(utils.TextureCache['continue']));
		this.continue.position.set(Glob.width * 0.5, 555);
		this.continue.anchor.set(0.5);
		this.continue.PI = 0;
		this.resize();
		this.curtain.hideCurtain(500);
	}

	update(dt) {
		TWEEN.update(dt);
		if (this.continue) {//пульсация кнопки Continue
			this.continue.PI += 0.05;
			this.continue.scale.set(1 + Math.sin(this.continue.PI) * 0.1);
		}
		if (this.dark-- === 0) {
			let w = window.innerWidth;
			let h = window.innerHeight;
			const kfStage = Math.min(w / Glob.width, h / Glob.height);
			w = Glob.width * kfStage / w;
			h = Glob.height * kfStage / h;
			this.box.scale.set(w, h);
			this.curtain.hideCurtain();
		}
	}

	resize(){
		let w = window.innerWidth;
		let h = window.innerHeight;
		this.app.view.style.width = w + "px";
		this.app.view.style.height = h + "px";
		this.curtain.showCurtain();
		this.dark = 20;
	}

}
var Root = new Main();
window.addEventListener("resize", () => {
	Root.resize();
});

