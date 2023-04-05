<template>
    <div
        class="x-filter-tag-item"
        :class="cpClassNames"
        @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useInjectFilterTagCtx, useInjectFilterTagSelectedValueCtx } from './context'

export default {
    name: 'XFilterTagItem',
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
    },
    slots: ['default'],
    setup(props) {
        const { multiple, onTagClick } = useInjectFilterTagCtx()
        const selectedKeys = useInjectFilterTagSelectedValueCtx()

        const cpClassNames = computed(() => {
            return {
                'x-filter-tag-item--active': isSelect(),
            }
        })

        /**
         * 点击
         */
        function handleClick() {
            onTagClick({ value: props.value })
        }

        function isSelect() {
            if (multiple.value) {
                // 多选
                return Array.isArray(selectedKeys.value) ? selectedKeys.value?.includes(props.value) : false
            } else {
                // 单选
                return selectedKeys.value === props.value
            }
        }

        return {
            cpClassNames,
            handleClick,
        }
    },
}
</script>

<style lang="less" scoped>
.x-filter-tag-item {
    padding: 0 @padding-xs;
    display: flex;
    align-items: center;
    border-radius: @border-radius-base;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        color: @primary-color;
    }

    &--active {
        box-shadow: 0 0 0 1px inset @primary-color;
        color: @primary-color;
    }
}
</style>
