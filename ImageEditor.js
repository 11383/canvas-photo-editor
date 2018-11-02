import cssFilter from './ImageEditor/FilterMethods/cssFilter.js'
import canvasFilter from './ImageEditor/FilterMethods/canvasFilter.js'
import canvasDataImg from './ImageEditor/FilterMethods/canvasDataImg.js'
import {RGB, HSL} from './ImageEditor/Pixels/Pixels.js'

class ImageEditor {
    constructor(selector) {
        
        this.options = {
            hue: 0,
            brighteness: 0,
            saturation: 0,
            contrast: 0
        }

        this.transformMethods = {
            cssFilter: new cssFilter(),
            canvasFilter: new canvasFilter(),
            canvasRGB: new canvasDataImg(RGB),
            canvasHSL: new canvasDataImg(HSL)
        }

        this.activeTransformMethod = this.transformMethods.cssFilter

        this.createCanvas(selector)

        window.addEventListener('resize', this.resizeCanvas.bind(this))
        this.resizeCanvas()

        // use effect
        this.activeTransformMethod.use(this.options)
    }

    brighteness(value) {
        this.options.brighteness = value

        this.activeTransformMethod.brighteness(value)

        this.draw()
    }

    contrast(value) {
        this.options.contrast = value

        this.activeTransformMethod.contrast(value)

        this.draw()
    }

    saturation(value) {
        this.options.saturation = value

        this.activeTransformMethod.saturation(value)

        this.draw()
    }

    // update options as array
    updateOption(optionName, newValue) {
        const allowedOptions = ['brighteness', 'contrast', 'saturation']

        if( allowedOptions.includes(optionName) ) {
            this[optionName](newValue)
        } else {
            throw new Error(`Not specified ${optionName} option!`)
        }
    }

    createCanvas(selector) {
        this.selector = selector
        this.element  = document.querySelector(this.selector)

        if(this.element == null) {
            throw new Error(`Element with given selector (${selector}) not found!`)
        }

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
    
        this.element.appendChild(this.canvas)
    }

    resizeCanvas() {
        this.canvas.width = this.element.clientWidth
        this.canvas.height = this.element.clientHeight

        this.img && this.fitImage(this.img.img)
    }

    fitImage(img) {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        
        const areaBounds = this.getCanvasImageBounds(img)
        this.ctx.drawImage(img, ...areaBounds)

        const dataImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        
        this.img = {
            img,
            areaBounds,
            dataImg
        }

        this.draw()
    }

    setImage(src) {
        let img = new Image()
        img.src = src

        img.addEventListener('load', () => {

            this.fitImage( img )
        })
    }

    // get secure canvas fill zone
    getCanvasImageBounds(img) {
        const hRatio = this.canvas.width  / img.width    ;
        const vRatio =  this.canvas.height / img.height  ;
        const ratio  = Math.min ( hRatio, vRatio );
        const centerShift_x = ( this.canvas.width - img.width*ratio ) / 2;
        const centerShift_y = ( this.canvas.height - img.height*ratio ) / 2;  

        return [
            0, 
            0,
            img.width, 
            img.height, 
            centerShift_x,
            centerShift_y,
            img.width*ratio, 
            img.height*ratio
        ]
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawImage() {
        const areaBounds = this.getCanvasImageBounds(this.img.img)
        this.ctx.drawImage(this.img.img, ...areaBounds)    
    }

    putImageData(imgData, x = 0, y = 0, ...params) {
        this.ctx.putImageData(imgData, x, y, ...params)
    }

    // return 
    getImgData() {
        const {data, width, height} = this.img.dataImg

        return new ImageData(
            new Uint8ClampedArray(data),
            width,
            height
        )
    }

    getTransformMethods() {
        return Object.keys(this.transformMethods)
    }

    setTransformMethod(transformMethodName) {
        if(this.getTransformMethods().includes(transformMethodName)) {
            // unuse old
            this.activeTransformMethod && this.activeTransformMethod.unuse(this)

            // use new
            this.activeTransformMethod = this.transformMethods[transformMethodName]
            this.activeTransformMethod.use(this.options)
            
            // apply changes to canvas
            this.draw()
        }
    }

    draw() {
        this.activeTransformMethod.draw(this)
    }
}

export default ImageEditor