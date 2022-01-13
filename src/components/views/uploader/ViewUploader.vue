<template>
  <div class="view-uploader">
    <AccountInput @show-info-input="showInfoInput" />
    <InfoInput v-if="showInfo" />
  </div>
</template>

<script>
import AccountInput from './AccountInput'
import InfoInput from './InfoInput'
import { ref } from 'vue'

export default {
  components: {
    AccountInput,
    InfoInput,
  },
  setup() {
    const showInfo = ref(false)

    const showInfoInput = () => {
      showInfo.value = true
    }

    return {
      showInfoInput,
      showInfo,
    }
  },
}
</script>

<style lang="scss">
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

        &.required {
          &:after {
            margin: 0 0 0 2px;
            color: red;
            content: '*';
          }
        }
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
