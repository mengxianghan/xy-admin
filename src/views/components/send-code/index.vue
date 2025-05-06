<script setup>
import Basic from './components/Basic.vue'
import Custom from './components/Custom.vue'
import Reset from './components/Reset.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Reset, Custom]" />
</template>

<style lang="less" scoped></style>
