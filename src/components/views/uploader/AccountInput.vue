<template>
  <div class="account-input contents-wrapper glass-wrapper">
    <h1 class="section-title">Metamask Account Info</h1>

    <div class="input-wrapper">
      <span class="title required">Reset Nonce</span>
      <input type="text" v-model="metamaskAccount.resetNonce" />
    </div>

    <div class="input-wrapper">
      <span class="title required">Reset Password</span>
      <input type="text" v-model="metamaskAccount.resetPassword" />
    </div>

    <div class="input-wrapper">
      <span class="title">Private Key</span>
      <input type="text" v-model="metamaskAccount.privateKey" />
    </div>

    <div class="button-wrapper">
      <AppButton :text="'Initialize'" @on-click="initialize" />
    </div>
  </div>
</template>

<script>
import uploader from '@/hooks/uploader.js'
import { ref } from 'vue'

export default {
  setup(props, { emit }) {
    const metamaskAccount = ref({
      resetNonce: null,
      resetPassword: '123123123',
      privateKey: null,
    })

    const { callApi } = uploader()

    const initialize = () => {
      callApi('init', metamaskAccount.value, ['privateKey'], () => {
        emit('show-info-input')
      })
    }

    return {
      metamaskAccount,
      initialize,
    }
  },
}
</script>
