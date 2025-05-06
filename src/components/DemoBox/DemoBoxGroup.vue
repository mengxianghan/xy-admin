<script setup>
import DemoBox from './DemoBox.vue'

defineOptions({
  name: 'XDemoBoxGroup',
})

defineProps({
  components: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="x-demo-box-container">
    <demo-box
      v-for="item in components"
      :key="item"
      :component="item"
    />
  </div>
</template>

<style lang="less" scoped>
.x-demo-box-container {
  max-width: 1000px;
  margin-inline: auto;
}
</style>
