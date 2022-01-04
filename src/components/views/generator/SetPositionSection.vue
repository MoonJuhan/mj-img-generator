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
          :deleteDisabled="true"
          :locked="true"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import CategoryWrapper from './CategoryWrapper'
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

    const initCanvas = () => {
      const baseImg = props.categoryList[0].imgList[0]

      refCanvas.value.width = baseImg.img.width
      refCanvas.value.height = baseImg.img.height

      const lazyDrawImage = async (index) => {
        const { img } = props.categoryList[index].imgList[0]
        refCanvas.value.getContext('2d').drawImage(img, 0, 0)

        setTimeout(() => {
          if (props.categoryList[index + 1]) {
            lazyDrawImage(index + 1)
          }
        }, 1000)
      }

      lazyDrawImage(0)
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
