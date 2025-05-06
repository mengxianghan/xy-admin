<script setup>
import Basic from './components/Basic.vue'
import Collapsed from './components/Collapsed.vue'
import Custom from './components/Custom.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Custom, Collapsed]" />
</template>

<style lang="less" scoped></style>
