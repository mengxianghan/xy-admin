<script setup>
import Advanced from './components/Advanced.vue'
import Basic from './components/Basic.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Advanced]" />
</template>

<style lang="less" scoped></style>
