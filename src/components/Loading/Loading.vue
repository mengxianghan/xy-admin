<template>
    <div
        class="x-loading"
        :class="classComputed">
        <spin :spinning="true"></spin>
    </div>
</template>

<script setup>
import { Spin, theme } from 'ant-design-vue'
import { computed } from 'vue'

defineOptions({
    name: 'XLoading',
})

const props = defineProps({
    /**
     * 类型，默认：fullscreen【全屏：fullscreen，指令：directive】
     */
    type: {
        type: String,
        default: 'fullscreen',
    },
})

const { token } = theme.useToken()

const classComputed = computed(() => {
    return {
        [`x-loading--${props.type}`]: true,
    }
})
</script>

<style lang="less" scoped>
.x-loading {
    &--fullscreen {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background: v-bind('token.colorBgMask');
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(.ant-spin-dot-item) {
            background: #fff;
        }
    }

    &--directive {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        background: rgba(255, 255, 255, 0.45);

        :deep(.ant-spin) {
            width: 100%;
            height: 100%;
            max-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
