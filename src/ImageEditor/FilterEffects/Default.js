/**
 *  Available transform methods:
 *  - cssFilter
 *  - canvasFilter
 *  - canvasRGB
 *  - canvasHSL 
 */

/**
 *  Postać Effect
 *  effect = {
 *      name: String // name of effect
 *      transformMethod: String, // one from available transform methods
 *      options: {       // override default options from transform method
 *          contrast: Number,
 *          brighteen: Number,
 *          saturation: Number
 *      },
 *      draw: (value, ...params) => {}  // method used to apply effect
 *                                      // value <-1, 1> decide of strong of effect
 *                                      // params depend of used transform method
 *  }  
 */

 /**
  * draw params:
  *  - cssFilter
  *     (value, { contrast, brighteenes, saturation }, actualFilters)
  * - canvasFilter
  *     (value, { contrast, brighteenes, saturation }, actualFilters)
  * - canvasRGB/canvasHSL
  *     (value, { contrast, brighteenes, saturation}, PixelObject, { x, y, width, height })
  */

const blur = {
    name: 'blur',
    transformMethod: 'cssFilter',
    draw: (value, {}, cssFilters) => {
        let blur = (value + 1) * 4

        return `${cssFilters} blur(${blur}px)`
    }
}

const warm = {
    name: 'warm',
    transformMethod: 'canvasRGB',
    draw: (value, {}, pixel) => {
        pixel.r = (value + 1) * 128

        return pixel
    }
}

const onlyRed = {
    name: 'onlyRed',
    transformMethod: 'canvasHSL',
    options: {
        effect: 1
    },
    draw: (value, {}, pixel) => {
        value *= 25
        const range = [360 - value, 0 + value]
        
        if (pixel.h > range[0] || pixel.h < range[1]) {
            // do nothing
        } else {
            pixel.s = 0
        }

        return pixel
    }
}

const contour = {
    name: 'contour',
    transformMethod: 'canvasHSL',
    options: {
        effect: 1
    },
    draw: (value, {}, pixel) => {
        pixel.l = pixel.l > 50 ? 100 : 0

        return pixel
    }
}

const fourColors = {
    name: '4colors',
    transformMethod: 'canvasRGB',
    draw: (value, {}, pixel, {x, y, width, height}) => {
        if (x < width / 2 && y < height / 2) {
            pixel.r = 255
        }
        else if (x >= width / 2 && y < height / 2) {
            pixel.g = 255
        }
        else if (x < width / 2 && y >= height / 2) {
            pixel.b = 255
        }

        return pixel
    }
}

const rainbow = {
    name: 'rainbow',
    transformMethod: 'canvasHSL',
    options: {
        saturation: 1.2,
        effect: 1
    },
    draw: (value, {}, pixel, {x, width}) => {
        pixel.h = x / width * value * 360

        return pixel
    }
}

/* named exports */
export const Blur = blur

/* default exports */
export default [
    blur,
    warm,
    onlyRed,
    rainbow,
    fourColors,
    contour
]