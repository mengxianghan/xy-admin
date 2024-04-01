<template>
    <x-demo-box-group :components="[Basic, Text, Slot, Cropper, Round, Multiple, Input]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Text from './components/Text.vue'
import Slot from './components/Slot.vue'
import Cropper from './components/Cropper.vue'
import Round from './components/Round.vue'
import Multiple from './components/Multiple.vue'
import Input from './components/Input.vue'
</script>

<style lang="less" scoped></style>
