<template>
    <div
        class="brand"
        :class="cpClass"
        :style="cpStyle">
        <img
            alt=""
            :src="config('app.logo')" />
        <h1>{{ config('app.title') }}</h1>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { config } from '@/config'
import { useAppStore } from '@/store'

defineOptions({
    name: 'Brand',
})

/**
 * @property {string} theme 主题【light=亮色，black=暗色】
 * @property {boolean} collapsed 当前收起状态
 */
const props = defineProps({
    theme: {
        type: String,
    },
    collapsed: {
        type: Boolean,
        default: false,
    },
})

const appStore = useAppStore()

const { config: appConfig } = storeToRefs(appStore)

const cpClass = computed(() => {
    return {
        [`brand--${props.theme}`]: true,
        'brand--collapsed': props.collapsed,
    }
})
const cpStyle = computed(() => {
    return {
        height: `${appConfig.value.headerHeight}px`,
    }
})
</script>

<style lang="less" scoped>
.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    position: relative;

    img {
        height: 28px;
    }

    h1 {
        font-size: 18px;
        margin: 0;
        padding: 0 12px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &--light {
        h1 {
            color: @color-text;
        }
    }

    &--dark {
        h1 {
            color: #fff;
        }
    }

    &--collapsed {
        h1 {
            display: none;
        }
    }
}
</style>
