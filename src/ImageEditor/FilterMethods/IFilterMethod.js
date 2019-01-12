class IFilterMethod {
    // fired when method is selected
    use(options) {}

    unuse() {}

    // fired when image is loaded && method is selected
    imgLoadDone() {
        throw new Error('Method not implemented!')
    }

    brighteness(value) {
        throw new Error('Method not implemented!')
    }

    contrast(value) {
        throw new Error('Method not implemented!')
    }

    saturation(value) {
        throw new Error('Method not implemented!')
    }

    hue(value) {
        throw new Error('Method not implemented!')
    }

    draw() {
        throw new Error('Method not implemented!')
    }
}

export default IFilterMethod;