/**
 * Interface for ImageEditor Filters
 */
class IFilterMethod {
    /**
     * Fired when ImageEditor select this filter
     * @param {Object} options 
     */
    use(options) {}

    /**
     * Fired when ImageEditor unselect this filter
     */
    unuse() {}

    /**
     * Fired when image is loaded and method is selected
     */
    imgLoadDone() {
        throw new Error('Method not implemented!')
    }

    /**
     * Set Bright
     * @param {Number} value Brighteness
     */
    brighteness(value) {
        throw new Error('Method not implemented!')
    }

    /**
     * Set Contrast
     * @param {Number} value Contrast
     */
    contrast(value) {
        throw new Error('Method not implemented!')
    }

    /**
     * Set Saturation
     * @param {Number} value Saturation
     */
    saturation(value) {
        throw new Error('Method not implemented!')
    }

    /**
     * Draw filter
     * @param {ImageEditor} imageEditor instance of ImageEditor to apply filter
     * @param {FilterEffects} effect instance of FilterEffect to apply
     */
    draw(imageEditor, effect) {
        throw new Error('Method not implemented!')
    }
}

export default IFilterMethod;