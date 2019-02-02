/**
 * Save canvas
 * @param {Canvas} canvas object of canvas 
 * @param {String} fileName name of created file
 */
const Save = (canvas, fileName = new Date().getTime()) => {

    const mimeType = "image/png"
    const imgUrl = canvas.toDataURL(mimeType)

    const downloadLink = document.createElement('a')
    downloadLink.download = fileName
    downloadLink.href = imgUrl
    downloadLink.dataset.downloadurl = [mimeType, downloadLink.download, downloadLink.href].join(':')

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

export default Save