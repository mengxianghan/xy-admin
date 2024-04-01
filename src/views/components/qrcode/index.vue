<template>
    <x-demo-box-group :components="[Basic, Icon, Status, Size, Color, Download, Error, Popover]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Icon from './components/Icon.vue'
import Status from './components/Status.vue'
import Size from './components/Size.vue'
import Color from './components/Color.vue'
import Download from './components/Download.vue'
import Error from './components/Error.vue'
import Popover from './components/Popover.vue'
</script>

<style lang="less" scoped></style>
