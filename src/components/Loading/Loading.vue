<template>
    <div class="x-loading">
        <spin
            :spinning="true"
            size="large"
            :tip="message"></spin>
    </div>
</template>

<script>
export default { name: 'Loading' }
</script>

<script setup>
import { Spin } from 'ant-design-vue'

/**
 * @property {string} message 提示信息，默认：加载中
 */
defineProps({
    message: {
        type: String,
        default: '加载中',
    },
})
</script>

<style lang="less" scoped>
.x-loading {
    position: fixed;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.65);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: saturate(180%) blur(6px);

    :deep(.ant-spin-text) {
        margin-top: 12px;
    }
}
</style>
