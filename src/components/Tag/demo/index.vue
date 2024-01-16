<template>
    <x-demo-box-group :components="[Basic, Bordered, Closeable, Shape, Color, Secondary]"></x-demo-box-group>
</template>

<script setup>
import Basic from './Basic.vue'
import Bordered from './Bordered.vue'
import Closeable from './Closeable.vue'
import Shape from './Shape.vue'
import Color from './Color.vue'
import Secondary from './Secondary.vue'
</script>

<style lang="less" scoped></style>
