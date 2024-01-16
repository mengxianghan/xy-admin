<template>
    <x-demo-box-group :components="[Basic, Custom, Collapsed]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Custom from './Custom.vue'
import Collapsed from './Collapsed.vue'
</script>

<style lang="less" scoped></style>
