<template>
  <div class="set-position-section glass-wrapper">
    <h1 class="section-title">Set Position (Disabled)</h1>

    <div class="contents-wrapper">
      <div class="preview-canvas">
        <span class="title">Preview Canvas</span>
        <canvas ref="refCanvas" />
      </div>

      <ul class="category-previews">
        <li class="title">Preview Category</li>
        <CategoryWrapper
          v-for="(item, index) in categoryList"
          :key="index"
          :item="item"
          :locked="true"
        />
      </ul>
    </div>

    <div class="button-wrapper">
      <AppButton :text="'Next Step'" @on-click="$emit('generate-images')" />
    </div>
  </div>
</template>

<script>
import CategoryWrapper from './CategoryWrapper'
import promiseDrawImage from '@/hooks/promise-draw-image.js'
import { ref } from 'vue'

export default {
  props: {
    categoryList: Array,
  },
  components: {
    CategoryWrapper,
  },
  setup(props) {
    const refCanvas = ref(null)

    const { drawImage } = promiseDrawImage()

    const initCanvas = async () => {
      const baseImg = props.categoryList[0].imgList[0]

      refCanvas.value.width = baseImg.img.width
      refCanvas.value.height = baseImg.img.height

      for (const cat of props.categoryList) {
        const { img } = cat.imgList[0]

        await drawImage(refCanvas.value, img)
      }
    }

    return {
      refCanvas,
      initCanvas,
    }
  },
}
</script>

<style lang="scss">
.set-position-section {
  .contents-wrapper {
    display: flex;
  }

  .preview-canvas {
    margin: 0 10px 0 0;

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

  .category-previews {
    .title {
      font-weight: bold;
    }

    .category-wrapper {
      margin: 0 0 8px;

      .title-wrapper {
        font-size: 14px;
        margin: 0 0 4px;

        span {
          padding: 0;
        }
      }

      li {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
