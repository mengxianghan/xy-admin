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

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
    name: 'MenuLink',
})
/**
 * @property {object} dataSource
 */
const props = defineProps({
    dataSource: {
        type: Object,
        default: () => ({}),
    },
})

const emit = defineEmits(['click'])

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

defineExpose({
    handleClick,
})
</script>

<style lang="less" scoped>
.menu-link {
    .ant-badge-count,
    .ant-badge-dot {
        box-shadow: none;
    }
}
</style>
