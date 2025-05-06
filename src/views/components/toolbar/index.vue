<script setup>
import Basic from './components/Basic.vue'
import Bordered from './components/Bordered.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Bordered]" />
</template>

<style lang="less" scoped></style>
