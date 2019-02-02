import HSLPixel from './HSL.js'
import RGBPixel from './RGB.js'

const pixelClass = {
    RGBPixel,
    HSLPixel
}

/*
 * Fabric of Pixels
 */ 
export default (name) => {
    return pixelClass[name]
}

export const RGB = 'RGBPixel'
export const HSL = 'HSLPixel'