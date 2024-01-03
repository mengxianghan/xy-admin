<template>
    <a-tag
        class="x-tag"
        v-bind="attrs"
        :style="cpStyle">
        <template #icon>
            <slot name="icon">
                <component :is="icon"></component>
            </slot>
        </template>
        <slot></slot>
    </a-tag>
</template>

<script setup>
import { useColors } from '@/hooks'
import { computed, useAttrs } from 'vue'

defineOptions({
    name: 'XTag',
})

const props = defineProps({
    color: {
        type: String,
    },
    textColor: {
        type: String,
    },
    icon: {
        type: Object,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
    bordered: {
        type: Boolean,
        default: true,
    },
})

const attrs = useAttrs()
const { generate } = useColors()

const cpStyle = computed(() => {
    const result = {}

    if (!props.secondary) {
        // 主要标签
        if (props.color) {
            result.backgroundColor = props.color
            result.borderColor = props.color
            result.color = props.textColor || '#fff'
        }
        if (props.textColor) {
            result.color = props.textColor
        }
    } else {
        // 次要标签
        result.backgroundColor = generate(props.color)[0]
        result.borderColor = props.color
        result.color = props.textColor || props.color
    }

    if (!props.bordered) {
        result.borderColor = 'transparent'
    }

    return result
})
</script>

<style lang="less" scoped>
.x-tag {
    box-sizing: border-box;
    margin: 0;

    :deep(> span[class*='icon']) {
        vertical-align: -0.125em;
    }
}
</style>
