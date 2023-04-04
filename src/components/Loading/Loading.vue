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

<script>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { computed, h } from 'vue'

/**
 * @property {string} type 类型，默认：default；【default=默认，directive=指令】
 * @property {string | object} title 标题
 * @property {string | object} subTitle 自标题
 * @property {string | object} extra 操作区
 */
export default {
    name: 'XLoading',
    props: {
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
    },
    setup(props) {
        const cpClassNames = computed(() => ({
            [`x-loading--${props.type}`]: true,
        }))
        const cpIcon = computed(() => {
            const iconObj = {
                loading: LoadingOutlined,
            }
            const icon = iconObj[props.icon] ? h(iconObj[props.icon]) : props.icon
            return h('div', { class: 'x-loading__icon' }, [icon])
        })
        const cpTitle = computed(() => {
            return h('div', { class: 'x-loading__title' }, [props.title])
        })
        const cpSubTitle = computed(() => {
            return h('div', { class: 'x-loading__sub-title' }, [props.subTitle])
        })
        const cpExtra = computed(() => {
            return h('div', { class: 'x-loading__extra' }, [props.extra])
        })

        return {
            cpClassNames,
            cpIcon,
            cpTitle,
            cpSubTitle,
            cpExtra,
        }
    },
}
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
        color: @text-color-secondary;
    }

    &__extra {
        margin: 16px 0 0;
    }
}
</style>
