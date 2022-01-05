<template>
  <div class="view-generator">
    <div class="button-wrapper glass-wrapper">
      <AppButton :text="'Add Category'" @on-click="addCategory" :disabled="progress !== 1" />
      <AppButton :text="'Set Position'" @on-click="setPosition" :disabled="progress !== 1" />
      <AppButton :text="'Generate Images'" @on-click="generateImages" :disabled="progress !== 2" />
    </div>

    <div class="wrap-div">
      <div class="section-wrapper" :class="`progress-${progress}`">
        <UploadSection class="section" ref="refUploadSection" :locked="progress !== 1" />
        <SetPositionSection class="section" ref="refSetPositionSection" :categoryList="refinedCategoryList" />
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
    const refUploadSection = ref(null)
    const refSetPositionSection = ref(null)
    const refGenerateSection = ref(null)

    const addCategory = () => {
      if (progress.value === 1) {
        refUploadSection.value.addCategory()
      }
    }

    const refinedCategoryList = ref([])

    const setPosition = () => {
      if (refUploadSection.value.refineItems()) {
        progress.value = 2
        refinedCategoryList.value = refUploadSection.value.localCategoryList

        nextTick(refSetPositionSection.value.initCanvas)
      }
    }

    const generateImages = () => {
      progress.value = 3

      nextTick(refGenerateSection.value.initCanvas)
    }

    return {
      refUploadSection,
      refSetPositionSection,
      refGenerateSection,
      addCategory,
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
