import HSLPixel from './ImageEditor/HSLPixel.js'

class ImageEditor {
    constructor(selector, containerSelector) {

        this.postProcessParams = {
            hue: 0,
            light: 0,
            saturation: 0,
            contrast: 0
        }

        this.postProcessEffects = {
            active: null,
            effects: {
                'red': this.redEffect,
                'test': this.testEffect
            },
        }

        this.createCanvas(selector)

        window.addEventListener('resize', this.resizeCanvas.bind(this))
        this.resizeCanvas()
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
        const pixels = HSLPixel.fromImageData(dataImg)
        
        this.img = {
            img,
            areaBounds,
            dataImg,
            pixels
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
        var hRatio = this.canvas.width  / img.width    ;
        var vRatio =  this.canvas.height / img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( this.canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( this.canvas.height - img.height*ratio ) / 2;  

        // saveArea
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

    // hslFilters
    noneEffect(hsl) {
        return hsl
    }

    testEffect(hsl, index, width, height) {
        const {h, s, l} = hsl
                
        return {
            h: index % width / width,
            // h,
            s,
            // s : h > 0.2 && h < 0.4 ? s : -1,
            // s: Math.random() * index % width / width,
            l
        }
    }

    redEffect(hsl, x, y, width, height) {
        const {s, l} = hsl

        return {
            h: 0.2,
            s,
            l: 0.2
        }
    }

    optionsEffects(hsl) {
        const {h,s,l} = hsl

        return {
            h: h + this.postProcessParams.hue,
            s: Math.max(s + this.postProcessParams.saturation, 0),
            l: l + this.postProcessParams.light
            // l: this.effects.light + Math.max( l +  this.effects.contrast / 5 * (l > 0.5 ? 1 : -1), 0)
        }
    }

    // applyEffects
    applyEffect(effect, pixels) {
        return pixels.map( (pixel, index) => {
            return effect(pixel, index, this.img.dataImg.width, this.img.dataImg.height)
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.img.pixels) {
            const effect = this.testEffect

            let manipulatedPixels = this.img.pixels

            if(this.postProcessEffects.active != null) {
                manipulatedPixels = this.applyEffect(this.postProcessEffects.effects[
                    this.postProcessEffects.active
                ], manipulatedPixels)
            }
            
            manipulatedPixels = this.applyEffect(this.optionsEffects.bind(this), manipulatedPixels)

            const imgData = HSLPixel.toImageData(manipulatedPixels, this.img.dataImg)

            this.img.dataImg && this.ctx.putImageData( imgData, 0, 0)
        }
        
    }
}

export default ImageEditor