<script setup>
import Async from './components/Async.vue'
import Basic from './components/Basic.vue'
import Callback from './components/Callback.vue'
import Drag from './components/Drag.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Drag, Async, Callback]" />
</template>

<style lang="less" scoped></style>
