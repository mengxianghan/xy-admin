<template>
    <x-demo-box-group :components="[Basic, Custom, Collapsed]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Custom from './components/Custom.vue'
import Collapsed from './components/Collapsed.vue'
</script>

<style lang="less" scoped></style>
