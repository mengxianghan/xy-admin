<template>
    <a-result
        status="403"
        title="403"
        sub-title="抱歉，您无权访问此页面。">
        <template #extra>
            <a-button type="primary">返回</a-button>
        </template>
    </a-result>
</template>

<script setup>
defineOptions({
    name: '403',
})
</script>

<style lang="less" scoped></style>
