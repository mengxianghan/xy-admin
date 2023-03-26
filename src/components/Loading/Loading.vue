<template>
    <div
        class="x-loading"
        :class="cpClassNames">
        <template v-if="cpIsLoading">
            <div class="x-loading__icon">
                <loading-outlined></loading-outlined>
            </div>
            <div class="x-loading__text">{{ text }}</div>
        </template>
        <template v-if="cpIsError">
            <div class="x-loading__icon">
                <exclamation-circle-outlined></exclamation-circle-outlined>
            </div>
            <div class="x-loading__text">加载失败</div>
            <div class="x-loading__desc">请检查设备网络连接，刷新重试</div>
            <div class="x-loading__extra">
                <a-button
                    type="primary"
                    @click="handleReload">
                    刷新
                </a-button>
            </div>
        </template>
    </div>
</template>

<script>
import { Button as AButton } from 'ant-design-vue'
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'

/**
 * @property {string} type 类型，默认：global；【global=全局，direcrive=指令】
 * @property {string} text 提示信息，默认：加载中
 * @property {boolean} status 状态，默认： loading；【loading=加载中，error=失败】
 */
export default {
    name: 'XLoading',
    components: {
        AButton,
        LoadingOutlined,
        ExclamationCircleOutlined,
    },
    props: {
        type: {
            type: String,
            default: 'global',
        },
        text: {
            type: String,
            default: '加载中',
        },
        status: {
            type: String,
            default: 'loading',
        },
    },
    setup(props) {
        const cpClassNames = computed(() => ({
            [`x-loading--${props.type}`]: true,
            [`x-loading--${props.status}`]: true,
        }))
        const cpIsLoading = computed(() => 'loading' === props.status)
        const cpIsError = computed(() => 'error' === props.status)

        function handleReload() {
            location.reload()
        }

        return {
            cpClassNames,
            cpIsLoading,
            cpIsError,
            handleReload,
        }
    },
}
</script>

<style lang="less" scoped>
.x-loading {
    background: rgba(255, 255, 255, 0.45);
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

    &--global {
        position: fixed;
    }

    &--directive {
        position: absolute;
    }

    :deep(.ant-spin-text) {
        margin-top: 12px;
    }

    &__icon {
        margin: 0 0 8px;
        font-size: 24px;
    }

    &__text {
        font-size: 14px;
        margin: 0 0 8px;
    }

    &__desc {
        font-size: 12px;
        color: @text-color-secondary;
        margin: 0 0 16px;
    }
}
</style>
