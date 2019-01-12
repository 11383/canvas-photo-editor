class HSLPixel {
    constructor( r, g, b ) {
        const [h, s, l] = HSLPixel.rgbToHsl(r, g, b)
        
        this.h = h * 360
        this.s = s * 100
        this.l = l * 100
    }

    contrast(value) {
        // @todo

        return this
    }

    brighteness(value) {
        this.l += value

        return this
    }

    saturation(value) {
        this.s = this.s / 10 * (value + 10)

        return this
    }

    value() {
        return HSLPixel.hslToRGB(this.h, this.s, this.l)
    }

    /* from: https://gist.github.com/mjackson/5311256 */
    static rgbToHsl(r, g, b)  {
        r /= 255, g /= 255, b /= 255;
      
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
      
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
        
            h /= 6;
        }
      
        return [ h, s, l ];
    }

    /* from: https://gist.github.com/mjackson/5311256 */
    static hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    /* from: https://gist.github.com/mjackson/5311256 */
    static hslToRGB(h, s, l) {
        let r, g, b;
        h/= 360
        s/=100
        l/=100
  
        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
        
            r = HSLPixel.hue2rgb(p, q, h + 1/3);
            g = HSLPixel.hue2rgb(p, q, h);
            b = HSLPixel.hue2rgb(p, q, h - 1/3);
        }
    
        return [ r * 255, g * 255, b * 255, 0 ];
    }
}

export default HSLPixel

window.pixel = new HSLPixel(0, 0, 255)
window.pixelClass = HSLPixel