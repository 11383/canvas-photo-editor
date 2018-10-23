class ImageLoader {
    constructor(selector) {
        this.events = {}
        
        this.createInputField(selector)
    }

    createInputField(selector) {
        this.selector = selector
        this.element = document.querySelector(selector)

        if(this.element == null) {
            throw new Error(`Element with given selector (${selector}) not found!`)
        }

        const input = document.createElement('input')
              input.type = 'file'
              input.className = 'img-upload'

        this.element.appendChild(input)

        input.addEventListener('change', (e) => this.onChange(e) )
    }

    onChange(e) {
        const input = e.target

        if(input && input.files && input.files[0]) {
            const reader = new FileReader()

            reader.addEventListener('load', (e) => {
                this.emit('load', e.target.result)
            })

            reader.readAsDataURL(input.files[0])
        }
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