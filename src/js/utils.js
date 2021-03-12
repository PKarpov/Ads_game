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
                            const cc = Math.round(v*255)
                            this.tint = cc << 16 | cc << 8 | cc;
                        } else {
                            console.log('value must be 0 - 1', v);
                        }
                    },
                }
        });
}
export { addScaleXYProperties };
