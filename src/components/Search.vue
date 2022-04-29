<template>
    <a-card class="search-card"
            v-bind="attrs">
        <slot></slot>
    </a-card>
</template>

<script>
export default {
    name: 'XSearch',
    computed: {
        attrs() {
            return {
                bordered: false,
                ...this.$attrs
            }
        }
    }
}
</script>

<style lang="less">
.search-card {
    &.ant-card {
        margin-bottom: 12px;
    }

    .ant-card-body {
        padding-bottom: 0;
    }

    .ant-form-inline {
        .ant-form-item {
            display: flex;
            margin-bottom: @card-padding-base;
            margin-right: 0;

            .ant-form-item-control-wrapper {
                flex: 1 1;
                display: inline-block;
                vertical-align: middle;
            }

            .ant-form-item-label {
                line-height: 32px;
                padding-right: 8px;
                width: auto;
            }

            .ant-form-item-control {
                height: 32px;
                line-height: 32px;
            }
        }
    }

    .ant-calendar-picker {
        width: 100%
    }
}
</style>
