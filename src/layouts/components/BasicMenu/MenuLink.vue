<template>
    <component
        rel="opener"
        class="basic-menu__title"
        :is="cpComponentName"
        :target="dataSource.meta.target"
        v-bind="cpComponentAttrs"
        @click="handleClick">
        <component
            v-if="dataSource.meta.icon"
            :is="dataSource.meta.icon" />
        <span class="basic-menu__text">{{ dataSource.meta.title }}</span>
        <a-badge
            v-if="dataSource.meta.badge"
            class="basic-menu__badge"
            :count="dataSource.meta.badge" />
    </component>
</template>

<script>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * @property {object} dataSource
 */
export default {
    name: 'MenuLink',
    props: {
        dataSource: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['click'],
    setup(props, { emit }) {
        const cpComponentName = computed(() =>
            props.dataSource?.path ? (props.dataSource?.meta?._isLink ? 'a' : RouterLink) : 'div'
        )
        const cpComponentAttrs = computed(() => {
            const { meta, path } = props.dataSource
            const attrs = {}
            if (props.dataSource?.path) {
                if (props.dataSource?.meta?._isLink) {
                    attrs.href = path
                } else {
                    attrs.to = {
                        path,
                        query: meta?.query ?? {},
                    }
                }
            }

            return attrs
        })

        function handleClick() {
            if (props.dataSource?.props) {
                props.dataSource?.props?.click?.call(null, props.dataSource)
            }
            emit('click', props.dataSource)
        }

        return {
            cpComponentName,
            cpComponentAttrs,
            handleClick,
        }
    },
}
</script>

<style lang="less" scoped>
.menu-link {
    .ant-badge-count,
    .ant-badge-dot {
        box-shadow: none;
    }
}
</style>
