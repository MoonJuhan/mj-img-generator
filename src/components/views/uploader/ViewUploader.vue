<template>
  <div class="view-uploader">
    <div class="contents-wrapper glass-wrapper">
      <h1 class="section-title">Upload Item`s Info</h1>

      <div class="input-wrapper">
        <span class="title">Name</span>
        <input type="text" v-model="uploadInfo.name" />
      </div>

      <div class="input-wrapper">
        <span class="title">File Start Index</span>
        <input type="number" v-model="uploadInfo.fileStartIndex" min="0" />
      </div>

      <div class="input-wrapper">
        <span class="title">Collection Name</span>
        <input type="text" v-model="uploadInfo.conllectionName" />
      </div>

      <div class="input-wrapper">
        <span class="title">Blockchain Name</span>
        <input type="text" v-model="uploadInfo.blockchainName" />
      </div>

      <div class="input-wrapper">
        <span class="title">price</span>
        <input type="number" v-model="uploadInfo.price" min="0" />
      </div>

      <div class="button-wrapper">
        <AppButton :text="'Check Available'" @on-click="checkAvailable" />
        <AppButton :text="'Upload Start'" @on-click="uploadStart" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  setup() {
    const uploadInfo = ref({
      name: null,
      fileStartIndex: null,
      conllectionName: null,
      blockchainName: null,
      price: null,
    })

    const serverURL = 'http://localhost:8081'

    const checkAvailable = async () => {
      const { status } = await axios.get(`${serverURL}/status`)

      if (status === 200) {
        alert('Go to Webdriver and Download Metamask Chrome Extention')
      } else {
        alert('Server Error')
      }
    }

    const validate = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        if (!value) return false
      }

      return true
    }

    const uploadStart = async () => {
      if (validate(uploadInfo.value)) {
        const { data, status } = await axios.post(`${serverURL}/items`, uploadInfo.value)

        console.log(data)

        if (status === 200) {
          alert('Completed')
        } else {
          alert('Error')
        }
      } else {
        alert('All Input Required')
      }
    }
    return {
      uploadInfo,
      uploadStart,
      checkAvailable,
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
