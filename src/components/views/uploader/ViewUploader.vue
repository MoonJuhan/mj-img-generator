<template>
  <div class="view-uploader">
    <div class="contents-wrapper glass-wrapper">
      <h1 class="section-title">Upload Item`s Info</h1>

      <div class="input-wrapper">
        <span class="title">Name</span>
        <input type="text" v-model="name" />
      </div>

      <div class="input-wrapper">
        <span class="title">File Start Index</span>
        <input type="number" v-model="fileStartIndex" min="0" />
      </div>

      <div class="input-wrapper">
        <span class="title">Collection Name</span>
        <input type="text" v-model="conllectionName" />
      </div>

      <div class="input-wrapper">
        <span class="title">Blockchain Name</span>
        <input type="text" v-model="blockchainName" />
      </div>

      <div class="input-wrapper">
        <span class="title">price</span>
        <input type="number" v-model="price" min="0" />
      </div>

      <div class="button-wrapper">
        <AppButton :text="'Call Node'" @on-click="callNode" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  setup() {
    const name = ref(null)
    const fileStartIndex = ref(null)
    const conllectionName = ref(null)
    const blockchainName = ref(null)
    const price = ref(null)

    const callNode = async () => {
      const data = await axios.get('http://localhost:8081/setup')
      console.log(data)
    }
    return {
      name,
      fileStartIndex,
      conllectionName,
      blockchainName,
      price,
      callNode,
    }
  },
}
</script>

<style lang="scss" scoped>
.view-uploader {
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0 0;
  }

  .contents-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 0 10px;

    .section-title {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 10px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;

      span {
        font-size: 14px;
      }
    }

    input {
      padding: 8px 16px;
      font-size: 16px;
      border: 1px solid rgba(44, 62, 80, 0.4);
      border-radius: 4px;
      margin: 0 10px 0 0;
    }

    .app-button {
      margin: 0 0 0 10px;
    }
  }
}
</style>
