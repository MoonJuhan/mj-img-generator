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
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
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
    const zip = new JSZip()

    urlList.forEach((el, index) => {
      zip.file(`${fileName}_${fileStartIndex + index}.png`, el, { base64: true })
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${fileName}_results.zip`)
    })
  }

  const imgToDataURL = (canvas) =>
    new Promise((resolve, reject) => {
      const dataURL = canvas.toDataURL()

      resolve(dataURL.substr(dataURL.indexOf(',') + 1))
    })

  const drawCombinations = async (categoryList, canvas) => {
    const refinedCombinations = refineCombination(combinations)

    for (const combination of refinedCombinations) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < combination.length; i++) {
        const { img } = categoryList[i].imgList[combination[i]]

        if (img) await drawImage(canvas, img)
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

  const setEmptyImage = (list) =>
    list.map((el, index) => {
      if (index !== 0) el.imgList.splice(0, 0, { img: null })

      return el
    })

  const refineCombination = (list) => {
    const randomized = list.sort(() => Math.random() - 0.5)

    const noEmptyList = randomized.filter(
      (el) =>
        [...el]
          .filter((i, index) => index !== 0)
          .join('')
          .replaceAll('0', '').length !== 0
    )

    return noEmptyList
  }

  return {
    setEmptyImage,
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

    const { setEmptyImage, combineImage, downloadImages, drawCombinations } = manageGeneration()

    const estimatedTime = ref(0.25)

    const initCanvas = async () => {
      const baseImg = props.categoryList[0].imgList[0]

      props.categoryList.forEach((cat, index) => {
        const imgLength = (index !== 0 ? 1 : 0) + cat.imgList.length
        estimatedTime.value = estimatedTime.value * imgLength
      })

      estimatedTime.value = estimatedTime.value * props.categoryList.length
      estimatedTime.value -= props.categoryList[0].imgList.length * 0.25

      refCanvas.value.width = baseImg.img.width
      refCanvas.value.height = baseImg.img.height
    }

    const generateImages = async () => {
      if (validateInput()) {
        const refinedCategoryList = setEmptyImage(props.categoryList)
        combineImage(refinedCategoryList, props.categoryList[0].imgList, [])
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
