<template>
    <x-demo-box-group :components="[Basic, Custom, DynamicColumns]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Custom from './Custom.vue'
import DynamicColumns from './DynamicColumns.vue'
</script>

<style lang="less" scoped></style>
