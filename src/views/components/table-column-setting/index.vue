<template>
    <x-demo-box-group :components="[Basic, Custom, DynamicColumns]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Custom from './components/Custom.vue'
import DynamicColumns from './components/DynamicColumns.vue'
</script>

<style lang="less" scoped></style>
