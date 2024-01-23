<template>
    <x-demo-box-group :components="[Basic, Drag, Async, Callback]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Drag from './Drag.vue'
import Async from './Async.vue'
import Callback from './Callback.vue'
</script>

<style lang="less" scoped></style>
