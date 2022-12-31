<template>
    <a-list
        item-layout="horizontal"
        :data-source="list"></a-list>
</template>

<script>
export default {
    name: 'Message',
}
</script>

<script setup>
import { ref } from 'vue'

const list = ref([])
</script>

<style lang="less" scoped></style>
