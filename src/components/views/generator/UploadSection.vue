<template>
  <ul class="upload-section glass-wrapper">
    <li class="section-title">Upload Section</li>

    <CategoryWrapper
      v-for="(item, index) in localCategoryList"
      :key="index"
      :item="item"
      @on-change-file="onChangeFile"
      @delete-image="deleteImage"
      @delete-category="deleteCategory"
      :deleteDisabled="index === 0"
      :locked="locked"
    />
  </ul>
</template>

<script>
import CategoryWrapper from './CategoryWrapper'
import { computed, ref } from 'vue'

export default {
  props: {
    locked: Boolean,
  },
  components: {
    CategoryWrapper,
  },
  setup() {
    const categoryList = ref([
      {
        name: 'Category 1',
        imgList: [],
        disabled: false,
      },
    ])

    const localCategoryList = computed(() => categoryList.value.filter((el) => !el.disabled))

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

    const addCategory = () => {
      categoryList.value.push({
        name: `Category ${categoryList.value.length + 1}`,
        imgList: [],
      })
    }

    const refineItems = () => {
      if (categoryList.value[0].imgList.length === 0) {
        alert('Category 1 requires at least one image.')

        return false
      } else {
        categoryList.value.forEach((cat) => {
          if (cat.imgList.length === 0) {
            cat.disabled = true
          }
        })

        return true
      }
    }

    return {
      categoryList,
      localCategoryList,
      addCategory,
      onChangeFile,
      deleteImage,
      deleteCategory,
      refineItems,
    }
  },
}
</script>

<style lang="scss" scoped>
.upload-section {
  li {
    margin: 0 0 20px;

    :nth-last-child(1) {
      margin: 0;
    }
  }
}
</style>
