import filterInterface from './IFilterMethod.js'

/**
 * CanvasFilter for ImageEditor
 * Operates of canvas proporties
 * @class canvasFilter
 * @extends {filterInterface}
 */
class canvasFilter extends filterInterface {

    constructor(options = {}) {
        super(options)

        this.options = {
            contrast: 100,
            brighteness: 100,
            saturation: 100
        }
    }

    use(options) {
        this.options = {}

        this.contrast(options.contrast)
        this.brighteness(options.brighteness)
        this.saturation(options.saturation)
    }

    unuse(imageEditor) {
        imageEditor.ctx.filter = ''
    }

    imgLoadDone() {}
    
    brighteness(value) { // < -1, 1 > => <0,100>
        this.options.brighteness = Number( (value + 1) * 100).toFixed(2)
    }

    contrast(value) { // -1,1 => <0,200>
        this.options.contrast = Number( (value + 1) * 100).toFixed(2)
    }

    saturation(value) { // -1,1 <0, 10> 
        this.options.saturation = Number( (value + 1) * 100).toFixed(2)
    }

    applyEffect(effect, filters) {
        return effect(this.options, filters)
    }

    draw(imageEditor, effect = null) {
        imageEditor.clearCanvas()

        let filters  = `
            contrast(${this.options.contrast}%)
            brightness(${this.options.brighteness}%)
            saturate(${this.options.saturation}%)
        `

        if (effect) {
            filters = this.applyEffect(effect, filters)
        }

        imageEditor.ctx.filter = filters
        imageEditor.drawImage()
    }
}

export default canvasFilter;