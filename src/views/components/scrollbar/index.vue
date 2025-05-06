<script setup>
import Basic from './components/Basic.vue'
import Horizontal from './components/Horizontal.vue'
import MaxHeight from './components/MaxHeight.vue'
import ScrollTo from './components/ScrollTo.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Horizontal, MaxHeight, ScrollTo]" />
</template>

<style lang="less" scoped></style>
