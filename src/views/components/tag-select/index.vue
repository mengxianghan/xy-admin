<script setup>
import Basic from './components/Basic.vue'
import Collapsed from './components/Collapsed.vue'
import Multiple from './components/Multiple.vue'
import Unlimited from './components/Unlimited.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Multiple, Unlimited, Collapsed]" />
</template>

<style lang="less" scoped></style>
