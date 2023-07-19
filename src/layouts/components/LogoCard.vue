<template>
    <div
        class="logo-card"
        :class="cpClassNames">
        <img
            alt=""
            :src="ICON_LOGO" />
        <h1>{{ TITLE }}</h1>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { ICON_LOGO, TITLE } from '@/config'
import { useAppStore } from '@/store'

defineOptions({
    name: 'LogoCard',
})

/**
 * @property {string} theme 主题【light=亮色，black=暗色】
 * @property {boolean} collapsed 当前收起状态
 */
const props = defineProps({
    theme: {
        type: String,
        default: 'light',
    },
    collapsed: {
        type: Boolean,
        default: false,
    },
})

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const cpClassNames = computed(() => {
    return {
        [`logo-card--${props.theme}`]: true,
        'logo-card--collapsed': props.collapsed,
    }
})
</script>

<style lang="less" scoped>
.logo-card {
    height: v-bind('config.headerHeight + "px"');
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
        background: #001529;

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
