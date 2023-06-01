<template>
    <a-list :data-source="list"></a-list>
</template>

<script setup>
defineOptions({
    name: 'AppList',
})

const list = []
</script>

<style lang="less" scoped></style>
