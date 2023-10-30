<template>
    <a-form class="x-filter-form">
        <slot></slot>
    </a-form>
</template>

<script setup>
import { Form as AForm } from 'ant-design-vue'

defineOptions({
    name: 'XFilterForm',
})
</script>

<style lang="less" scoped>
.x-filter-form {
    :deep(.ant-form-item) {
        margin-bottom: 12px;

        &:last-child {
            margin-bottom: 0;
        }

        .ant-form-item-control-input-content {
            line-height: 32px;
        }
    }
}
</style>
