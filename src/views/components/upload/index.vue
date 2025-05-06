<script setup>
import Basic from './components/Basic.vue'
import Cropper from './components/Cropper.vue'
import Input from './components/Input.vue'
import Multiple from './components/Multiple.vue'
import Round from './components/Round.vue'
import Slot from './components/Slot.vue'
import Text from './components/Text.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Text, Slot, Cropper, Round, Multiple, Input]" />
</template>

<style lang="less" scoped></style>
