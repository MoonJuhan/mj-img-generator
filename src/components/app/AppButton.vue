<template>
  <a class="app-button" :class="{ disabled, small }" @click="onClick" v-html="text" />
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    text: String,
    link: String,
    disabled: Boolean,
    small: Boolean,
  },
  setup(props, { emit }) {
    const router = useRouter()

    const onClick = () => {
      if (props.disabled) return

      if (props.link) {
        router.push(props.link)
      } else {
        emit('on-click')
      }
    }

    return {
      onClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.app-button {
  cursor: pointer;
  padding: 8px 16px;
  background-color: rgba(44, 62, 80, 0.2);
  border-radius: 10px;
  transition: all 0.4s;

  &.disabled {
    background-color: rgba(44, 62, 80, 0.1);
    cursor: default;

    &:active {
      background-color: rgba(44, 62, 80, 0.1);
    }
  }

  &.small {
    font-size: 14px;
    padding: 4px 8px;
  }

  &:hover {
    background-color: rgba(44, 62, 80, 0.1);
  }

  &:active {
    background-color: rgba(44, 62, 80, 0.4);
  }
}
</style>
