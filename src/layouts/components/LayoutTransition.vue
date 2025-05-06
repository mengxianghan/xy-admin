<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <transition
    mode="out-in"
    name="slide-fade"
  >
    <div :key="route.name">
      <slot />
    </div>
  </transition>
</template>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(4px);
  opacity: 0;
}
</style>
