<script setup>
import Basic from './components/Basic.vue'
import Custom from './components/Custom.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Custom]" />
</template>

<style lang="less" scoped></style>
