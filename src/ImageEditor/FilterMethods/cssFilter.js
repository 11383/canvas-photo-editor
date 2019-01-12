import filterInterface from './IFilterMethod.js'

class cssFilter extends filterInterface {

    constructor(options = {}) {
        super(options)

        this.options = {
            contrast: 1,
            brighteness: 1,
            saturation: 0
        }
    }

    use(options) {
        this.options = {}

        this.contrast(options.contrast)
        this.brighteness(options.brighteness)
        this.saturation(options.saturation)
    }

    unuse(imageEditor) {
        imageEditor.canvas.style.filter = ''
    }

    imgLoadDone() {}
    
    brighteness(value) { // < -100, 100 > => <0,2>
        this.options.brighteness = Number(value + 1).toFixed(2)
    }

    contrast(value) { // -1,1 => <0,2>
        this.options.contrast = Number(value + 1).toFixed(2)
    }

    saturation(value) { // -1,1 <0, 10> 
        this.options.saturation = Number((value * 5 ) + 1).toFixed(2)
    }

    applyEffect(effect, filters) {
        return effect(this.options, filters)
    }

    draw(imageEditor, effect = null) {

        let filters = `
            contrast(${this.options.contrast})
            brightness(${this.options.brighteness})
            saturate(${this.options.saturation})
        `

        if (effect) {
            filters = this.applyEffect(effect, filters)
        }

        imageEditor.canvas.style.filter = filters
    }
}

export default cssFilter;