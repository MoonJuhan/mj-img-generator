const promiseDrawImage = () => {
  const drawImage = (refCanvas, img) =>
    new Promise((resolve, reject) => {
      refCanvas.getContext('2d').drawImage(img, 0, 0)

      setTimeout(function () {
        resolve()
      }, 500)
    })

  return {
    drawImage,
  }
}

export default promiseDrawImage
