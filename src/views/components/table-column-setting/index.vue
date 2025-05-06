<script setup>
import Basic from './components/Basic.vue'
import Custom from './components/Custom.vue'
import DynamicColumns from './components/DynamicColumns.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Custom, DynamicColumns]" />
</template>

<style lang="less" scoped></style>
