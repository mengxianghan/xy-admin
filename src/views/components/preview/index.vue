<script setup>
import Basic from './components/Basic.vue'
import Media from './components/Media.vue'
import Multiple from './components/Multiple.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Multiple, Media]" />
</template>

<style lang="less" scoped></style>
