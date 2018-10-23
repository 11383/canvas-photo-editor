(function(){
    let canvas = document.querySelector('.editor')
    let ctx = canvas.getContext('2d')

    const imgSrc = './img.jpg'

    let img = new Image()
    img.src = imgSrc

    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    })

    document.querySelector('#change')
        .addEventListener('click', () => {brighteness(20)})

    document.querySelector('#contrast')
        .addEventListener('click', () => {contrast(2)})
    
    // brighteness
    function brighteness(factor) {
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        // let factor = 20

        for(let i=0; i<imgData.data.length; i+=4) {
            imgData.data[i]    = Math.min(255, imgData.data[i] + factor)
            imgData.data[i+1]  = Math.min(255, imgData.data[i+1] + factor)
            imgData.data[i+2]  = Math.min(255, imgData.data[i+2] + factor)
        }

        ctx.putImageData(imgData, 0, 0)
    }

    function contrast(factor) {
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        for(let i=0; i<imgData.data.length; i+=4) {
            let pixel = getRGB(imgData.data.slice(i, i + 4))
            
            !isBrightPixel(pixel) && ( factor = -factor )

            imgData.data[i]    = Math.min(255, imgData.data[i] + factor)
            imgData.data[i+1]  = Math.min(255, imgData.data[i+1] + factor)
            imgData.data[i+2]  = Math.min(255, imgData.data[i+2] + factor)
        }

        ctx.putImageData(imgData, 0, 0)
    }

    function isBrightPixel(pixel) {
        return  pixel.r > 128 || 
                pixel.g > 128 || 
                pixel.b > 128
    }

    function getRGB(array) {
        return {
            r: array[0],
            g: array[1],
            b: array[2]
        }
    }

})()