<template>
  <div class="app-nav glass-wrapper">
    <AppButton :text="'Go Generate Page'" :link="'/generator'" :disabled="currentRoute === '/generator'" />
    <AppButton :text="'Go Upload Page'" :link="'/uploader'" :disabled="currentRoute === '/uploader'" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const router = useRouter()

    const currentRoute = computed(() => router.currentRoute.value.path)

    return {
      currentRoute,
    }
  },
}
</script>

<style lang="scss" scoped>
.app-nav {
  display: flex;
  margin: 0 0 30px;

  .app-button {
    margin: 0 10px 0 0;
  }
}
</style>
