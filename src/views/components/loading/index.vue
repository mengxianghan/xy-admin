<script setup>
import DirectiveBasic from './components/DirectiveBasic.vue'
import DirectiveDescription from './components/DirectiveDescription.vue'
import GlobalBasic from './components/GlobalBasic.vue'
import GlobalCustom from './components/GlobalCustom.vue'
import GlobalSize from './components/GlobalSize.vue'
</script>

<template>
  <x-demo-box-group :components="[GlobalBasic, GlobalSize, GlobalCustom, DirectiveBasic, DirectiveDescription]" />
</template>

<style lang="less" scoped></style>
