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
        return `${cssFilters} blur(${value}px)`
    }
}

const red = {
    name: 'red',
    transformMethod: 'canvasRGB',
    draw: (value, {}, pixel) => {
        pixel.r = 255

        return pixel
    }
}

const rainbow = {
    name: 'rainbow',
    transformMethod: 'canvasHSL',
    options: {
        saturation: 1.2
    },
    draw: (value, {}, pixel, {x, width}) => {
        pixel.h =  x / width

        return pixel
    }
}

/* named exports */
export const Blur = blur

/* default exports */
export default [
    blur,
    red,
    rainbow
]