<script setup>
import Basic from './components/Basic.vue'
import Gutter from './components/Gutter.vue'
import Offset from './components/Offset.vue'
import Responsive from './components/Responsive.vue'
import ResponsiveColumns from './components/ResponsiveColumns.vue'
import Suffix from './components/Suffix.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Gutter, Offset, ResponsiveColumns, Responsive, Suffix]" />
</template>

<style lang="less" scoped></style>
