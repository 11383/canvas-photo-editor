import cssFilter from './ImageEditor/FilterMethods/cssFilter.js'
import canvasFilter from './ImageEditor/FilterMethods/canvasFilter.js'
import canvasDataImg from './ImageEditor/FilterMethods/canvasDataImg.js'
import {RGB, HSL} from './ImageEditor/Pixels/Pixels.js'
import Effects from './ImageEditor/FilterEffects/Default.js'
import CanvasSave from './ImageEditor/Utils/Canvas.js'

/**
 * ImageEditor
 * Create canvas image editor
 * @class ImageEditor
 */
class ImageEditor {
    constructor(selector) {
        
        this.options = {
            hue: 0,
            brighteness: 0,
            saturation: 0,
            contrast: 0,
            effect: 0
        }

        this.transformMethods = {
            cssFilter: new cssFilter(this.options, this),
            canvasFilter: new canvasFilter(),
            canvasRGB: new canvasDataImg(RGB),
            canvasHSL: new canvasDataImg(HSL)
        }

        this.effects = Effects
        this.activeEffect = null

        this.activeTransformMethod = this.transformMethods.cssFilter

        this.createCanvas(selector)

        window.addEventListener('resize', this.resizeCanvas.bind(this))
        this.resizeCanvas()

        // use filter
        this.activeTransformMethod.use(this.options)
    }

    /**
     * Set Bright
     * @param {Number} value brighteness [-1.0, 1.0]
     */
    brighteness(value) {
        this.options.brighteness = value

        this.activeTransformMethod.brighteness(value)

        this.draw()
    }

    /**
     * Set Contrast
     * @param {Number} value contrast [-1.0, 1.0]
     */
    contrast(value) {
        this.options.contrast = value

        this.activeTransformMethod.contrast(value)

        this.draw()
    }

    /**
     * Set saturation
     * @param {Number} value saturation [-1.0, 1.0]
     */
    saturation(value) {
        this.options.saturation = value

        this.activeTransformMethod.saturation(value)

        this.draw()
    }

    /**
     * Set selected effect strenght
     * @param {Number} value 
     */
    effect(value) {
        this.options.effect = value

        this.draw()
    }

    // update options as array
    updateOption(optionName, newValue) {
        const allowedOptions = ['brighteness', 'contrast', 'saturation', 'effect']

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

        img.addEventListener('load', () => { this.fitImage( img ) })
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
        this.activeTransformMethod.draw(
            this,
            this.drawEffect()
        )
    }

    drawEffect() {
        if(this.activeEffect !== null) {
            return (...params) => this.activeEffect.draw(
                this.options.effect, 
                ...params
            )
        }

        return null
    }

    //add & apply new filter to ImageEditor
    applyEffect(filter) {
        this.effects.push(filter)
    }

    //returns all effects names
    getEffects() {
        return this.effects.map( item => item.name )
    }

    setEffect(effectName) {
        const effect = this.effects.find( item => item.name == effectName )

        if (effect !== undefined) {
            // override brigteness, saturation , contrast if needed
            effect.options && (
                this.options = {...this.options, ...effect.options}
            )

            this.activeEffect = effect
            this.setTransformMethod(effect.transformMethod)
        } else {
            this.clearEffect()
        }
    }

    // clear effect
    clearEffect() {
        if (this.activeEffect) {
            this.activeTransformMethod.unuse(this)
        }

        this.activeEffect = null
        // update view
        this.drawImage()
    }

    /**
     * Save canvas
     */
    save() {
        CanvasSave(this.canvas)
    }
}

export default ImageEditor