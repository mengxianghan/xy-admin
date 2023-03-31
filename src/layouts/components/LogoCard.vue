<template>
    <div
        class="logo-card"
        :class="cpClassNames">
        <img :src="ICON_LOGO" />
        <h1>{{ TITLE }}</h1>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ICON_LOGO, TITLE } from '@/config'

/**
 * @property {string} theme 主题【light=亮色，black=暗色】
 * @property {boolean} collapsed 当前收起状态
 */
export default {
    name: 'LogoCard',
    props: {
        theme: {
            type: String,
            default: 'light',
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const appStore = useAppStore()

        const { config } = storeToRefs(appStore)

        const cpClassNames = computed(() => {
            return {
                [`logo-card--${props.theme}`]: true,
                'logo-card--collapsed': props.collapsed,
            }
        })

        return {
            ICON_LOGO,
            TITLE,
            config,
            cpClassNames,
        }
    },
}
</script>

<style lang="less" scoped>
.logo-card {
    height: v-bind('config.header.height + "px"');
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    position: relative;

    img {
        height: 32px;
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
            color: @text-color;
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
