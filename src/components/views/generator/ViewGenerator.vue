<template>
  <div class="view-generator">
    <div class="wrap-div">
      <div class="section-wrapper" :class="`progress-${progress}`">
        <UploadSection class="section" :locked="progress !== 1" @set-position="setPosition" />
        <SetPositionSection
          class="section"
          ref="refSetPositionSection"
          :categoryList="refinedCategoryList"
          @generate-images="generateImages"
        />
        <GenerateSection class="section" ref="refGenerateSection" :categoryList="refinedCategoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import UploadSection from './UploadSection'
import SetPositionSection from './SetPositionSection'
import GenerateSection from './GenerateSection'
import { nextTick, ref } from 'vue'

export default {
  components: {
    UploadSection,
    SetPositionSection,
    GenerateSection,
  },
  setup() {
    const progress = ref(1)

    const refSetPositionSection = ref(null)
    const refGenerateSection = ref(null)

    const refinedCategoryList = ref([])

    const setPosition = (categoryList) => {
      progress.value = 2

      refinedCategoryList.value = categoryList

      nextTick(refSetPositionSection.value.initCanvas)
    }

    const generateImages = () => {
      progress.value = 3

      nextTick(refGenerateSection.value.initCanvas)
    }

    return {
      refSetPositionSection,
      refGenerateSection,
      setPosition,
      generateImages,
      progress,
      refinedCategoryList,
    }
  },
}
</script>

<style lang="scss">
.view-generator {
  .button-wrapper {
    display: flex;
    margin: 0 0 30px;

    .app-button {
      margin: 0 10px 0 0;
    }
  }

  .wrap-div {
    position: relative;
    width: 100vw;
    height: calc(100vh);
    margin: 0 -8px;

    .section-wrapper {
      width: 300%;
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      transition: all 0.4s;

      &.progress-2 {
        left: -100%;
      }

      &.progress-3 {
        left: -200%;
      }

      .section {
        margin: 0 8px;

        .section-title {
          font-size: 20px;
          font-weight: bold;
          margin: 0 0 10px;
        }
      }
    }
  }
}
</style>
