<script setup>
import Basic from './components/Basic.vue'
import CustomItem from './components/CustomItem.vue'
import Dynamic from './components/Dynamic.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, CustomItem, Dynamic]" />
</template>

<style lang="less" scoped></style>
