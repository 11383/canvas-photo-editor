import filterInterface from './IFilterMethod.js'
import PixelFabric, {RGB} from '../Pixels/Pixels.js'

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

    draw(imageEditor) {
        const imgData = imageEditor.getImgData()

        for(let i=0; i < imgData.data.length; i += 4 ) {

            // more redeable, but slowly
            // const pixel = new RGBPixel( imgData.data[i], imgData.data[i+1], imgData.data[i+2])
            //
            // pixel
            //   .contrast(this.options.contrast)
            //   .saturation(this.options.saturation)
            //   .brighteness(this.options.brighteness)
            //   .value()
            //
            // [ imgData.data[i], imgData.data[i+1], imgData.data[i+2]] = pixel
              
            [ imgData.data[i], imgData.data[i+1], imgData.data[i+2]] = 
                (new this.pixelClass( 
                    imgData.data[i], 
                    imgData.data[i+1], 
                    imgData.data[i+2]
                ))
                .contrast(this.options.contrast)
                .saturation(this.options.saturation)
                .brighteness(this.options.brighteness)
                .value()
        }

        imageEditor.putImageData(imgData)
    }
}

export default canvasDataImg