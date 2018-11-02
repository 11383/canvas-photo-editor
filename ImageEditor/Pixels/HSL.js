class HSLPixel {
    constructor( r, g, b ) {
        this.r = r
        this.g = g
        this.b = b

        // @todo convert to hsl
    }

    contrast(value) {
        // @todo

        return this
    }

    brighteness(value) {
        // @todo

        return this
    }

    saturation(value) {
        // @todo

        return this
    }

    value() {
        // @todo convert hsl => rgb
        return [this.r, this.g, this.b]
    }
}

export default HSLPixel