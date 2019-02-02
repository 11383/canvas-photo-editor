import filterInterface from './IFilterMethod.js'
import PixelFabric, {RGB} from '../Pixels/Pixels.js'

/**
 * CanvasDataImgFilter for ImageEditor
 * Operates on canvas data img (raw pixels)
 * @class canvasDataImg
 * @extends {filterInterface}
 */
class canvasDataImg extends filterInterface {

    constructor(pixelClass = RGB) {
        super()

        this.pixelClass = PixelFabric(pixelClass)
    }

    use(options) {
        this.options = {}

        this.contrast(options.contrast)
        this.brighteness(options.brighteness)
        this.saturation(options.saturation)
    }
    
    unuse(imageEditor) {
        imageEditor.putImageData(
            imageEditor.getImgData()
        )
    }

    imgLoadDone() {}

    brighteness(value) {
        this.options.brighteness = value * 100
    }

    contrast(value) {
        this.options.contrast = value * 100
    }

    saturation(value) {
        this.options.saturation = value * 10
    }

    applyEffect(effect, pixel, i, orgWidth, orgHeight, width, height, offsetX) {
        
        effect(this.options, pixel, {
            x: (i / 4 % orgWidth) - offsetX,
            y: Math.floor( i / 4 / orgHeight ) + 1,
            width,
            height
        })
    }

    draw(imageEditor, effect = null) {
        const imgData = imageEditor.getImgData()
        const width = imageEditor.img.areaBounds[6]
        const height = imageEditor.img.areaBounds[7]
        const offsetX = (imgData.width - width) / 2

        for(let i=0; i < imgData.data.length; i += 4 ) {
            const x = i / 4 % imgData.width 

            if( x > offsetX && x < imgData.width - offsetX) {

                let pixel = new this.pixelClass(
                    imgData.data[i], 
                    imgData.data[i+1], 
                    imgData.data[i+2]
                )

                if (effect) {
                    this.applyEffect(effect, pixel, i, imgData.width, imgData.height, width, height, offsetX)
                }
                
                [ imgData.data[i], imgData.data[i+1], imgData.data[i+2] ] = pixel
                .contrast(this.options.contrast)
                .saturation(this.options.saturation)
                .brighteness(this.options.brighteness)
                .value()
            }
        }

        imageEditor.putImageData(imgData)
    }
}

export default canvasDataImg