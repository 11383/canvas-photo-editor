class ImageLoader {
    constructor(selector) {
        this.events = {}
        
        this.input = document.querySelector(selector)
        this.input && this.input.addEventListener('change', (e) => this.onChange(e) )

        this.emit('init', this)
    }

    onChange(e) {
        const input = e.target

        if(input && input.files && input.files[0]) {

            Array.from( input.files ).forEach( file => {
                const reader = new FileReader()

                reader.addEventListener('load', (e) => {
                    this.emit('load', e.target.result, file)
                })

                reader.readAsDataURL(file)
            })
        }

        this.emit('change', e)
    }

    on(eventName, callback) {
        !this.events[eventName] && (this.events[eventName] = [])

        this.events[eventName].push(callback)
    }

    emit(eventName, ...params) {
        this.events[eventName] && 
        this.events[eventName].forEach( callback => callback(...params) )
    }
}