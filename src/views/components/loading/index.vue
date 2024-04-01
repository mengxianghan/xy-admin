<template>
    <x-demo-box-group :components="[GlobalBasic, GlobalSize, GlobalCustom, DirectiveBasic, DirectiveDescription]">
    </x-demo-box-group>
</template>

<script setup>
import GlobalBasic from './components/GlobalBasic.vue'
import GlobalSize from './components/GlobalSize.vue'
import GlobalCustom from './components/GlobalCustom.vue'
import DirectiveBasic from './components/DirectiveBasic.vue'
import DirectiveDescription from './components/DirectiveDescription.vue'
</script>

<style lang="less" scoped></style>
