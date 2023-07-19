<template>
    <div
        class="x-loading"
        :class="cpClassNames">
        <component :is="cpIcon"></component>
        <component
            v-if="title"
            :is="cpTitle"></component>
        <component
            v-if="subTitle"
            :is="cpSubTitle"></component>
        <component
            v-if="extra"
            :is="cpExtra"></component>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed, h } from 'vue'

import { LoadingOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'XLoading',
})

/**
 * @property {string} type 类型，默认：default；【default=默认，directive=指令】
 * @property {string | object} title 标题
 * @property {string | object} subTitle 自标题
 * @property {string | object} extra 操作区
 */
const props = defineProps({
    type: {
        type: String,
        default: 'default',
    },
    icon: {
        type: [Object, String],
        default: 'loading',
    },
    title: {
        type: [Object, String],
        default: '正在努力加载',
    },
    subTitle: {
        type: [Object, String],
    },
    extra: {
        type: [Object, String],
    },
})

const state = ref({
    icon: props.icon,
    title: props.title,
    subTitle: props.subTitle,
    extra: props.extra,
})

const cpClassNames = computed(() => ({
    [`x-loading--${props.type}`]: true,
}))
const cpIcon = computed(() => {
    const iconObj = {
        loading: LoadingOutlined,
    }
    const icon = iconObj[state.value.icon] ? h(iconObj[state.value.icon]) : state.value.icon
    return h('div', { class: 'x-loading__icon' }, [icon])
})
const cpTitle = computed(() => {
    return h('div', { class: 'x-loading__title' }, { default: () => state.value.title })
})
const cpSubTitle = computed(() => {
    return h('div', { class: 'x-loading__sub-title' }, { default: () => state.value.subTitle })
})
const cpExtra = computed(() => {
    return h('div', { class: 'x-loading__extra' }, { default: () => state.value.extra })
})

/**
 * 更新
 * @param {object} options
 * @param {string | object} options.icon
 * @param {string | object} options.title
 * @param {string | object} options.subTitle
 * @param {string | object} options.extra
 */
function setOption(options = {}) {
    state.value = {
        ...state.value,
        ...options,
    }
}

defineExpose({
    setOption,
})
</script>

<style lang="less" scoped>
.x-loading {
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: saturate(180%) blur(6px);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;

    &--default {
        position: fixed;
    }

    &--directive {
        position: absolute;
    }

    &__icon {
        font-size: 24px;
    }

    &__title {
        margin: 8px 0 0;
    }

    &__sub-title {
        margin: 4px 0 0;
        color: @color-text-secondary;
        font-size: 12px;
    }

    &__extra {
        margin: 16px 0 0;
    }
}
</style>
