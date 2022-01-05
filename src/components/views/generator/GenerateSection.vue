<template>
  <div class="generate-section glass-wrapper">
    <h1 class="section-title">Generate</h1>

    <div class="form-wrapper">
      <div class="input-wrapper">
        <span class="title">File Name</span>
        <input type="text" v-model="fileName" />
      </div>

      <div class="input-wrapper">
        <span class="title">File Start Index</span>
        <input type="number" v-model="fileStartIndex" min="0" />
      </div>
    </div>

    <div class="form-wrapper">
      <span>File Name Example: {{ fileName }}_{{ fileStartIndex }}.png</span>
      <AppButton :text="'Generate and Download'" @on-click="generateImages" />
    </div>

    <div class="generate-canvas">
      <span class="title">Generate Canvas (Estimated Time : {{ estimatedTime }}sec)</span>
      <canvas ref="refCanvas" />
    </div>
  </div>
</template>

<script>
import promiseDrawImage from '@/hooks/promise-draw-image.js'
import { ref } from 'vue'

const setFilesName = () => {
  const fileName = ref(null)
  const fileStartIndex = ref(null)

  const validateInput = () => {
    if (!fileName.value) return false

    if (!fileStartIndex.value) return false

    return true
  }

  return {
    fileName,
    fileStartIndex,
    validateInput,
  }
}

const manageGeneration = () => {
  const { drawImage } = promiseDrawImage()

  const combinations = []
  const urlList = []

  const downloadImages = (fileName, fileStartIndex) => {
    urlList.forEach((el, index) => {
      const aTag = document.createElement('a')
      aTag.download = `${fileName}_${fileStartIndex + index}.png`
      aTag.href = el
      aTag.click()
    })
  }

  const imgToDataURL = (canvas) =>
    new Promise((resolve, reject) => {
      let dataURL = canvas.toDataURL('image/png')

      dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream')

      dataURL = dataURL.replace(
        /^data:application\/octet-stream/,
        'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png'
      )

      resolve(dataURL)
    })

  const drawCombinations = async (categoryList, canvas) => {
    for (const combination of combinations) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < combination.length; i++) {
        const { img } = categoryList[i].imgList[combination[i]]
        await drawImage(canvas, img)
      }
      const dataURL = await imgToDataURL(canvas)
      urlList.push(dataURL)
    }
  }

  const combineImage = (categoryList, imgList, indexList) => {
    const depth = indexList.length

    imgList.forEach((img, index) => {
      const nextIndexList = [...indexList, index]
      const nextCatIndex = depth + 1

      if (categoryList.length > nextCatIndex) {
        combineImage(categoryList, categoryList[nextCatIndex].imgList, nextIndexList)
      } else {
        combinations.push(nextIndexList)
      }
    })
  }

  return {
    combineImage,
    downloadImages,
    drawCombinations,
  }
}

export default {
  props: {
    categoryList: Array,
  },
  setup(props) {
    const refCanvas = ref(null)

    const { fileName, fileStartIndex, validateInput } = setFilesName()

    const { combineImage, downloadImages, drawCombinations } = manageGeneration()

    const estimatedTime = ref(0)

    const initCanvas = async () => {
      const baseImg = props.categoryList[0].imgList[0]

      props.categoryList.forEach((cat) => {
        estimatedTime.value += props.categoryList.length * cat.imgList.length * 0.25
      })

      refCanvas.value.width = baseImg.img.width
      refCanvas.value.height = baseImg.img.height
    }

    const generateImages = async () => {
      if (validateInput()) {
        combineImage(props.categoryList, props.categoryList[0].imgList, [])
        await drawCombinations(props.categoryList, refCanvas.value)
        downloadImages(fileName.value, fileStartIndex.value)
      } else {
        alert('Set File Name and Index')
      }
    }

    return {
      refCanvas,
      fileName,
      fileStartIndex,
      initCanvas,
      generateImages,
      estimatedTime,
    }
  },
}
</script>

<style lang="scss">
.generate-section {
  .form-wrapper {
    display: flex;
    align-items: center;
    margin: 0 0 10px;

    .input-wrapper {
      display: flex;
      flex-direction: column;

      span {
        font-size: 14px;
      }
    }

    input {
      padding: 8px 16px;
      font-size: 16px;
      border: 1px solid rgba(44, 62, 80, 0.4);
      border-radius: 4px;
      margin: 0 10px 0 0;
    }

    .app-button {
      margin: 0 0 0 10px;
    }
  }

  .generate-canvas {
    .title {
      display: flex;
      font-weight: bold;
    }

    canvas {
      width: 400px;
      height: 400px;
      border: 1px solid rgba(44, 62, 80, 0.4);
      border-radius: 10px;
    }
  }
}
</style>
