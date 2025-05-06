<script setup>
import Basic from './components/Basic.vue'
import Color from './components/Color.vue'
import Download from './components/Download.vue'
import Error from './components/Error.vue'
import Icon from './components/Icon.vue'
import Popover from './components/Popover.vue'
import Size from './components/Size.vue'
import Status from './components/Status.vue'
</script>

<template>
  <x-demo-box-group :components="[Basic, Icon, Status, Size, Color, Download, Error, Popover]" />
</template>

<style lang="less" scoped></style>
