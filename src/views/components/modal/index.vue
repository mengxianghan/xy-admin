<template>
    <x-demo-box-group :components="[Basic, Drag, Async, Callback]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Drag from './components/Drag.vue'
import Async from './components/Async.vue'
import Callback from './components/Callback.vue'
</script>

<style lang="less" scoped></style>
