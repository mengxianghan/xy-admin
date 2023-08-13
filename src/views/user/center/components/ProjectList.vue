<template>
    <a-list :data-source="listData"></a-list>
</template>

<script setup>
defineOptions({
    name: 'ProjectList',
})

const listData = []
</script>

<style lang="less" scoped></style>
