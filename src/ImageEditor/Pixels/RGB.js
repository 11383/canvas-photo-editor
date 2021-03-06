/**
 * RGB
 */
class RGBPixel {
    constructor( r, g, b ) {
        this.r = r
        this.g = g
        this.b = b
    }

    /**
     * Set contrast
     * @param {Number} value Contrast
     */
    contrast(value) {
        const contrast = (value/100) + 1;
        const intercept = 128 * (1 - contrast);

        this.r = this.r*contrast + intercept;
        this.g = this.g*contrast + intercept;
        this.b = this.b*contrast + intercept;

        return this
    }


    /**
     * Set Bright
     * @param {Number} value Brightennes
     */
    brighteness(value) {
        this.r += value
        this.g += value
        this.b += value

        return this
    }


    /**
     * Set Saturation
     * @param {Number} value Saturation
     */
    saturation(value) {

        var gray = 0.2989*this.r + 0.5870*this.g + 0.1140*this.b; //weights from CCIR 601 spec
        this.r = -gray * value + this.r * (1+value);
        this.g = -gray * value + this.g * (1+value);
        this.b = -gray * value + this.b * (1+value);

        return this
    }


    /**
     * Get RGB value
     * @returns {Array} [R, G, B]
     */
    value() {
        return [this.r, this.g, this.b]
    }
}

export default RGBPixel