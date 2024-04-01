<template>
    <x-demo-box-group :components="[Basic, Multiple, Unlimited, Collapsed]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Multiple from './components/Multiple.vue'
import Unlimited from './components/Unlimited.vue'
import Collapsed from './components/Collapsed.vue'
</script>

<style lang="less" scoped></style>
