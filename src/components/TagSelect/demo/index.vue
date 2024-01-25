<template>
    <x-demo-box-group :components="[Basic, Multiple, Unlimited, Collapsed]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Multiple from './Multiple.vue'
import Unlimited from './Unlimited.vue'
import Collapsed from './Collapsed.vue'
</script>

<style lang="less" scoped></style>
