<template>
    <a-tag
        :class="{
            'x-tag--round': round,
        }"
        :style="cpStyle"
        class="x-tag"
        v-bind="attrs">
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
import { theme } from 'ant-design-vue'

defineOptions({
    name: 'XTag',
})

const props = defineProps({
    /**
     * 按钮类型，可选：default、primary、info、success、warning、error
     */
    type: {
        type: String,
        default: 'default',
    },
    color: String,
    textColor: String,
    borderColor: String,
    icon: Object,
    secondary: {
        type: Boolean,
        default: false,
    },
    bordered: {
        type: Boolean,
        default: true,
    },
    round: {
        type: Boolean,
        default: false,
    },
})

const attrs = useAttrs()
const { generate } = useColors()
const { token } = theme.useToken()

const cpStyle = computed(() => {
    const result = {}
    let color

    switch (props.type) {
        case 'primary':
            color = token.value.colorPrimary
            break
        case 'info':
            color = token.value.colorInfo
            break
        case 'success':
            color = token.value.colorSuccess
            break
        case 'warning':
            color = token.value.colorWarning
            break
        case 'error':
            color = token.value.colorError
            break
    }

    if (props.color) {
        color = props.color
    }

    if (!props.secondary) {
        // 主要标签
        if (color) {
            result.backgroundColor = color
            result.borderColor = props.borderColor || color
            result.color = props.textColor || '#fff'
        }
        if (props.textColor) {
            result.color = props.textColor
        }
    } else {
        // 次要标签
        result.backgroundColor = generate(color)[0]
        result.borderColor = props.borderColor || color
        result.color = props.textColor || color
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

    &--round {
        border-radius: 10em;
    }

    :deep(> span[class*='icon']) {
        vertical-align: -0.125em;
    }

    :deep(.ant-tag-close-icon) {
        color: currentColor;
    }
}
</style>
