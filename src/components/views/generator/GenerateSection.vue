<template>
  <div class="generate-section glass-wrapper">
    <h1 class="section-title">Generate</h1>

    <div class="generate-canvas">
      <span class="title">Generate Canvas</span>
      <canvas ref="refCanvas" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    categoryList: Array,
  },
  setup(props) {
    const refCanvas = ref(null)

    const downloadImage = (name) => {
      let dataURL = refCanvas.value.toDataURL('image/png')

      dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream')

      dataURL = dataURL.replace(
        /^data:application\/octet-stream/,
        'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png'
      )

      console.log(dataURL)

      // const aTag = document.createElement('a')
      // aTag.download = `resized_${name}`
      // aTag.href = dataURL
      // aTag.click()
    }

    const generateImage = () => {
      const baseImg = props.categoryList[0].imgList[0]

      refCanvas.value.width = baseImg.img.width
      refCanvas.value.height = baseImg.img.height

      const lazyDrawImage = async (index) => {
        const { img } = props.categoryList[index].imgList[0]
        refCanvas.value.getContext('2d').drawImage(img, 0, 0)

        setTimeout(() => {
          if (props.categoryList[index + 1]) {
            lazyDrawImage(index + 1)
          } else {
            downloadImage('test')
          }
        }, 1000)
      }

      lazyDrawImage(0)
    }

    return {
      refCanvas,
      generateImage,
    }
  },
}
</script>

<style lang="scss">
.generate-section {
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
