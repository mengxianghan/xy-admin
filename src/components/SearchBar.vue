<template>
    <a-card v-bind="$attrs">
        <slot></slot>
    </a-card>
</template>

<script>
export default {
    name: 'XSearchBar',
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
