<template>
    <x-demo-box-group :components="[GlobalBasic, GlobalSize, GlobalCustom, DirectiveBasic, DirectiveDescription]">
    </x-demo-box-group>
</template>

<script setup>
import GlobalBasic from './GlobalBasic.vue'
import GlobalSize from './GlobalSize.vue'
import GlobalCustom from './GlobalCustom.vue'
import DirectiveBasic from './DirectiveBasic.vue'
import DirectiveDescription from './DirectiveDescription.vue'
</script>

<style lang="less" scoped></style>
