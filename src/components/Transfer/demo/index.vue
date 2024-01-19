<template>
    <x-demo-box-group :components="[Basic, CustomItem, Dynamic]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import CustomItem from './CustomItem.vue'
import Dynamic from './Dynamic.vue'
</script>

<style lang="less" scoped></style>
