<template>
  <li class="category-wrapper">
    <div class="title-wrapper">
      <span v-html="item.name" />
      <AppButton
        v-if="item.imgList.length === 0 && !deleteDisabled && !locked"
        :text="'Delete Category'"
        @on-click="deleteCategory"
      />
    </div>

    <ul>
      <li v-for="(img, imgIndex) in item.imgList" :key="imgIndex">
        <img :src="img.img.src" />
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
export default {
  props: {
    item: Object,
    deleteDisabled: Boolean,
    locked: Boolean,
  },
  setup(props, { emit }) {
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

    return {
      onChangeFile,
      deleteImage,
      deleteCategory,
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

    span {
      padding: 6px 0;
    }

    .app-button {
      font-size: 16px;
      margin: 0 0 0 10px;
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
