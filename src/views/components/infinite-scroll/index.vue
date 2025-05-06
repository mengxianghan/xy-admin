<script setup>
import Basic from './components/Basic.vue'
import Error from './components/Error.vue'
import Hook from './components/Hook.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Error, Hook]" />
</template>

<style lang="less" scoped></style>
