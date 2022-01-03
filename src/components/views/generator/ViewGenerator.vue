<template>
  <div class="view-generator">
    <!-- <iframe
      width="640px"
      height="480px"
      src="https://www.artstation.com/embed/44520477"
      frameborder="0"
      allowfullscreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      onmousewheel=""
      scrolling="no"
    ></iframe> -->

    <ul>
      <CategoryWrapper
        v-for="(item, index) in localCategoryList"
        :key="index"
        :item="item"
        @on-change-file="onChangeFile"
        @delete-image="deleteImage"
        @delete-category="deleteCategory"
        :deleteDisabled="index === 0"
      />

      <li class="button-wrapper glass-wrapper">
        <AppButton :text="'Add Category'" @on-click="addCategory" />
        <AppButton :text="'Set Position'" @on-click="setPosition" />
      </li>
    </ul>

    <!-- <canvas ref="refCanvas" />
    <canvas ref="refNewCanvas" />
    <input type="file" multiple @change="onChangeFile" /> -->
  </div>
</template>

<script>
import CategoryWrapper from './CategoryWrapper'
import { computed, ref } from 'vue'

const manageUpload = () => {
  const categoryList = ref([
    {
      name: 'Category 1',
      imgList: [],
      disabled: false,
    },
  ])

  const localCategoryList = computed(() => categoryList.value.filter((el) => !el.disabled))

  const addCategory = () => {
    if (!uploadLock.value) {
      categoryList.value.push({
        name: `Category ${categoryList.value.length + 1}`,
        imgList: [],
      })
    }
  }

  const readFile = (category, file) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        category.push({ img, name: file.name })
      }

      img.src = event.target.result
    }

    reader.readAsDataURL(file)
  }

  const onChangeFile = async ({ files, imgList }) => {
    console.log('onChangeFile')
    for (let i = 0; i < files.target.files.length; i++) {
      readFile(imgList, files.target.files[i])
    }
  }

  const deleteImage = ({ index, name }) => {
    categoryList.value.find((el) => el.name === name).imgList.splice(index, 1)
  }

  const deleteCategory = ({ name }) => {
    categoryList.value.find((el) => el.name === name).disabled = true
  }

  return {
    categoryList,
    localCategoryList,
    addCategory,
    onChangeFile,
    deleteImage,
    deleteCategory,
  }
}

export default {
  components: {
    CategoryWrapper,
  },
  setup() {
    const { categoryList, localCategoryList, addCategory, onChangeFile, deleteImage, deleteCategory } = manageUpload()
    }

    return {
      categoryList,
      localCategoryList,
      addCategory,
      onChangeFile,
      deleteImage,
      deleteCategory,
    }
  },
}
</script>

<style lang="scss" scoped>
.view-generator {
  display: flex;

  li {
    margin: 0 0 40px;

    :nth-last-child(1) {
      margin: 0;
    }

    .app-button {
      padding: 8px 30px;
      margin: 0 10px 0 0;
    }

    &.button-wrapper {
      display: flex;
    }
  }
}
</style>
