import { Container, Application, Sprite, utils, Loader, Graphics } from 'pixi.js';
import Hammer from "./js/Hammer";
import Menu from "./js/Menu";
import Stairs from "./js/Stairs";
import Final from "./js/Final";

export default class Main {
	constructor() {
		Main.width = 1270;
		Main.height = 640;

        const app = new Application({width: Main.width, height: Main.height, backgroundColor: 0x000000});
		document.body.appendChild(app.view);
		app.ticker.add(this.update, this);
		Main.app = app;
		this.box = app.stage.addChild(new Container());
		this.box.position.set(Main.width * 0.5, Main.height * 0.5);
		this.main = this.box.addChild(new Container());
		this.main.position.set(-Main.width * 0.5, -Main.height * 0.5);
		this.back = this.main.addChildAt(Sprite.from('./assets/back.jpg'), 0);
		Loader.shared.add('art', './assets/texture.json')
			.load(() => this.createRoom());

		Main.observer = new utils.EventEmitter();
		Main.EVENT_HAMMER_TAP = 'HAMMER_TAP';
		Main.EVENT_MENU_TAP = 'MENU_TAP';
		Main.EVENT_SHOW_FINAL = 'SHOW_FINAL';
		Main.changes = false;
		Main.oldId = -1;
	}

	createRoom() {
		this.decor = this.main.addChild(new Container());
		this.addArt(
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
		Main.observer.once(Main.EVENT_HAMMER_TAP, this.menu.show, this.menu);
		Main.observer.on(Main.EVENT_MENU_TAP, (button)=>{this.stairs.showNewStire(button.ID)});

		this.main.addChild(this.stairs, this.menu);

		this.main.addChild(new Hammer);

		this.addArt([{png: 'dec', x: 1124, y:438}]);

		this.main.addChild(new Final());

		this.addArt([{png: 'logo', x: 175, y:55, name:'logo'}]);
		this.logo.anchor.set(0.5);
		this.logo.scale.set(0);
		new TWEEN.Tween(this.logo.scale)
			.delay(400)
			.easing(TWEEN.Easing.Bounce.Out)
			.to({x: 1, y: 1}, 800)
			.start();

		this.continue = this.main.addChild(new Sprite(utils.TextureCache['continue']));
		this.continue.position.set(Main.width * 0.5, 555);
		this.continue.anchor.set(0.5);
		this.continue.PI = 0;
		this.resize();
	}

	addArt(art, box = this.main) {
		let item;
		for (let i = 0; i < art.length; i++) {
			item = art[i];
			let tt = box.addChild(new Sprite(utils.TextureCache[item.png]));
			tt.position.set(item.x, item.y);
			if(item.name) {
				this[item.name] = tt;
			}
		}
	}

	update(dt) {
		TWEEN.update();
		if (this.continue) {//пульсация кнопки Continue
			this.continue.PI += 0.05;
			this.continue.scale.set(1 + Math.sin(this.continue.PI) * 0.1);
		}
	}
	resize(){
		let w = window.innerWidth;
		let h = window.innerHeight;
		Main.app.view.style.width = w + "px";
		Main.app.view.style.height = h + "px";
		const kfStage = Math.min(w / Main.width, h / Main.height);
		w = Main.width * kfStage / w;
		h = Main.height * kfStage / h;
		this.box.scale.set(w, h);
	}
}
var Root = new Main();
window.addEventListener("resize", (e)=> {
	Root.resize();
})
