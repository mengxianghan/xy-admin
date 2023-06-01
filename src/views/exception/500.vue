<template>
    <a-result
        status="500"
        title="500"
        sub-title="对不起，服务器错误。">
        <template #extra>
            <a-button type="primary">返回</a-button>
        </template>
    </a-result>
</template>

<script setup>
defineOptions({
    name: '500',
})
</script>

<style lang="less" scoped></style>
