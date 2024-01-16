<template>
    <x-demo-box-group :components="[Basic, Text, Slot, Cropper, Round, Multiple, File]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Text from './Text.vue'
import Slot from './Slot.vue'
import Cropper from './Cropper.vue'
import Round from './Round.vue'
import Multiple from './Multiple.vue'
import File from './File.vue'
</script>

<style lang="less" scoped></style>
