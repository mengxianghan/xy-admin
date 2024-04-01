<template>
    <x-demo-box-group :components="[Basic, Bordered, Closeable, Shape, Color, Secondary]"></x-demo-box-group>
</template>

<script setup>
import Basic from './components/Basic.vue'
import Bordered from './components/Bordered.vue'
import Closeable from './components/Closeable.vue'
import Shape from './components/Shape.vue'
import Color from './components/Color.vue'
import Secondary from './components/Secondary.vue'
</script>

<style lang="less" scoped></style>
