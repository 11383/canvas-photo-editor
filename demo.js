function initSelect(selector, options, onChange) {
    const select = document.querySelector(selector)

    options.forEach( option => {
        const optionEl = document.createElement('option')
              optionEl.value = optionEl.innerText = option
        select.appendChild(optionEl)
    })

    select.addEventListener('change', onChange)
}

function initMethodsSelect(selector, editor) {
    initSelect(selector, editor.getTransformMethods(), e => {
        editor.setTransformMethod(e.target.value)
    })

    // select first transform methods
    document.querySelector(selector).value = editor.getTransformMethods()[0]
}

function initEffectsSelect(selector, editor, callback) {
    initSelect(selector, editor.getEffects(), e => {
        editor.setEffect(e.target.value)
        
        callback(editor.options)
    })
}

function initSlidersEvents(selector, editor) {
    const sliders = document.querySelectorAll(selector)

    sliders.forEach( slider => {
        slider.addEventListener('input', e => {
            const name = e.target.getAttribute('id')
            const value = Number.parseFloat(e.target.value)

            editor.updateOption(name, value)
        })
    })
}

function updateSliders(options) {
    Object.keys(options).forEach( option => {
        const item = document.querySelector(`input#${option}`)
        item && (item.MaterialSlider.change(options[option]))
    })
}

function createImagePreview(img, name) {
    const preview = document.createElement('div')
          preview.classList.add('demo-card-image', 'mdl-card', 'mdl-shadow--2dp', 'mdl-cell')
          preview.style.backgroundImage = `url(${img})`

          preview.innerHTML = `
            <div class="mdl-card__title mdl-card--expand"></div>
            <div class="mdl-card__actions">
                <span class="demo-card-image__filename">${name}</span>
            </div>
          `
            
    return preview
}