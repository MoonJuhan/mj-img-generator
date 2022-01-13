<template>
  <div class="contents-wrapper glass-wrapper">
    <h1 class="section-title">Upload Item`s Info</h1>

    <div class="input-wrapper">
      <span class="title required">Name</span>
      <input type="text" v-model="uploadInfo.name" />
    </div>

    <div class="input-wrapper">
      <span class="title required">File Start Index</span>
      <input type="number" v-model="uploadInfo.fileStartIndex" min="0" />
    </div>

    <div class="input-wrapper">
      <span class="title required">Collection Name</span>
      <input type="text" v-model="uploadInfo.conllectionName" />
    </div>

    <div class="input-wrapper">
      <span class="title required">Blockchain Name</span>
      <select v-model="uploadInfo.blockchainName">
        <option value="Polygon">Polygon</option>
      </select>
    </div>

    <div class="input-wrapper">
      <span class="title required">Price</span>
      <input type="number" v-model="uploadInfo.price" min="0" />
    </div>

    <div class="button-wrapper">
      <AppButton :text="'Upload Start'" @on-click="uploadStart" />
    </div>
  </div>
</template>

<script>
import uploader from '@/hooks/uploader.js'
import { ref } from 'vue'

export default {
  setup() {
    const uploadInfo = ref({
      name: null,
      fileStartIndex: null,
      conllectionName: null,
      blockchainName: 'Polygon',
      price: null,
    })

    const { callApi } = uploader()

    const uploadStart = () => {
      callApi('items', uploadInfo.value, [], null)
    }

    return {
      uploadInfo,
      uploadStart,
    }
  },
}
</script>
