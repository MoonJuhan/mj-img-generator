<template>
  <li class="category-wrapper">
    <span v-html="item.name" />

    <div class="title-wrapper" v-if="!locked">
      <div class="required-checkbox">
        <input type="checkbox" v-model="required" :disabled="isBaseImage" />
        <span @click="onChangeCheckbox">Required</span>
      </div>

      <AppButton
        v-if="item.imgList.length === 0 && !isBaseImage"
        :text="'Delete'"
        :small="true"
        @on-click="deleteCategory"
      />
    </div>

    <ul>
      <li v-for="(img, imgIndex) in item.imgList" :key="imgIndex">
        <img :src="img.img?.src" />
        <span v-if="!locked" class="delete-button" @click="deleteImage(imgIndex)">Delete</span>
      </li>
      <li v-if="!locked">
        <input type="file" multiple @change="onChangeFile" />
        <span>Add Image</span>
      </li>
    </ul>
  </li>
</template>

<script>
import { onMounted, ref, watch } from 'vue'

export default {
  props: {
    item: Object,
    isBaseImage: Boolean,
    locked: Boolean,
  },
  setup(props, { emit }) {
    const required = ref(false)

    const onChangeFile = (e) => {
      emit('on-change-file', {
        files: e,
        imgList: props.item.imgList,
      })
    }

    const deleteImage = (index) => {
      emit('delete-image', {
        index,
        name: props.item.name,
      })
    }

    const deleteCategory = () => {
      emit('delete-category', {
        name: props.item.name,
      })
    }

    const onChangeCheckbox = () => {
      if (!props.isBaseImage) required.value = !required.value
    }

    watch(
      () => required.value,
      () => emit('on-change-required', { item: props.item, required: required.value })
    )

    onMounted(() => {
      if (props.isBaseImage) required.value = true
    })

    return {
      required,
      onChangeFile,
      deleteImage,
      deleteCategory,
      onChangeCheckbox,
    }
  },
}
</script>

<style lang="scss" scoped>
.category-wrapper {
  .title-wrapper {
    display: flex;
    font-size: 20px;
    margin: 0 0 10px;
    align-items: center;

    .app-button {
      margin: 0 0 0 10px;
    }
  }

  .required-checkbox {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 4px 0;

    * {
      cursor: pointer;
    }
  }

  ul {
    display: flex;
  }

  li {
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 10px 0 0;
    border: 1px solid rgba(44, 62, 80, 0.4);
    border-radius: 10px;

    input {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    img {
      width: 100%;
    }

    .delete-button {
      display: flex;
      align-items: center;
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
  }
}
</style>
