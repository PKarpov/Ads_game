import {Sprite, utils} from "pixi.js";

function addScaleXYProperties(object) {//для упрощения работы с TWEEN
    Object.defineProperties(object,
        {
            scaleX:
                {
                    get() { return this.scale.x },
                    set(v) { this.scale.x = v },
                },
            scaleY:
                {
                    get() { return this.scale.y },
                    set(v) { this.scale.y = v },
                },
            scaleXY:
                {
                    get() { return this.scale.x },
                    set(v) { this.scale.set(v) },
                },
            dark:
                {
                    get() { return (this.tint & 0x0000ff)/255},
                    set(v) {
                        if (v >= 0 && v <= 1) {
                            const cc = Math.round(v * 255);
                            this.tint = cc << 16 | cc << 8 | cc;
                        } else {
                            console.error('value must be 0 - 1', v);
                        }
                    },
                }
        });
}

function addArt(art, box) {
    let item;
    for (let i = 0; i < art.length; i++) {
        item = art[i];
        let tt = new Sprite(utils.TextureCache[item.png]);
        tt.position.set(item.x, item.y);
        box.addChild(tt);
    }
}

function getNewSprite(data, xy) {
    let sprite = new Sprite(utils.TextureCache[data.png]);
    if (data.xy) {
        sprite.position.set(...data.xy);
    }
    if(data.an) {
        sprite.anchor.set(0.5);
    }
    if (data.sc) {
        sprite.scale.set(...data.sc);
    }
    if (data.ti) {
        sprite.tint = data.tint;
    }
    if (data.rt) {
        sprite.rotation = data.rt;
    }
    if (xy) {
        addScaleXYProperties(sprite);
    }
    return sprite;
}

export { addScaleXYProperties, addArt, getNewSprite };
