<template>
    <a-card :bordered="false">
        <slot></slot>
    </a-card>
</template>

<script>
export default {
    name: 'SearchBar',
    setup() {
    },
}
</script>

<style lang="less"
       scoped>
:deep(.ant-form) {
    display: block;
}

:deep(.ant-form-inline .ant-form-item) {
    margin-right: 0;
}

:deep(.ant-form-item-control-input-content) {
    > * {
        width: 100%;
    }
}
</style>
