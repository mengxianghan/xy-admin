<script setup>
import Basic from './components/Basic.vue'
import Dialog from './components/Dialog.vue'
import FileType from './components/FileType.vue'
import Ratio from './components/Ratio.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Ratio, FileType, Dialog]" />
</template>

<style lang="less" scoped></style>
