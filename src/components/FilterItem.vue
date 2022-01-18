<template>
    <div class="x-filter-item">
        <div v-if="showLabel"
             class="x-filter-item__label"
             :style="labelStyles">
            <slot v-if="$slots.label"
                  name="label"></slot>
            <template v-else>{{ label }}</template>
            <template v-if="colon">：</template>
        </div>
        <div class="x-filter-item__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {computed, inject, toRefs} from 'vue'

/**
 * @property {string} label 标签文本
 * @property {boolean} colon 是否显示冒号
 */
export default {
    name: 'FilterItem',
    props: {
        label: {
            type: String,
            default: '',
        },
        colon: {
            type: Boolean,
            default: true,
        },
        labelWidth: {
            type: String,
            default: '',
        },
    },
    setup(props, ctx) {
        const {label, labelWidth} = toRefs(props)
        const showLabel = computed(() => !!label.value || ctx.slots.label)

        const labelWidthParent = inject('labelWidth')

        const labelStyles = computed(() => ({
            width: labelWidth?.value || labelWidthParent?.value || '',
        }))

        return {
            showLabel,
            labelStyles,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-filter-item {
    display: flex;
    padding: @padding-xs 0;
    line-height: 30px;

    &__label {
        padding-right: @margin-sm;
        text-align: right;
    }

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: @border-color-split dashed 1px;
    }
}
</style>
