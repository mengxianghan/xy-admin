<template>
    <x-demo-box-group :components="[Basic, CustomItem, Dynamic]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import CustomItem from './components/CustomItem.vue'
import Dynamic from './components/Dynamic.vue'
</script>

<style lang="less" scoped></style>
