<template>
    <div v-if="visible"
         class="x-loading">
        <spin size="large"
              :tip="message"></spin>
    </div>
</template>

<script>/**
 * @name XLoading
 * @description 全局 loading
 * @property {boolean} visible 状态
 * @property {string} message 文案
 */
import {ref} from 'vue'
import {Spin} from 'ant-design-vue'

export default {
    name: 'XLoading',
    components: {Spin},
    setup() {
        const visible = ref(false)
        const message = ref('加载中')

        function show(content = '') {
            if ('' !== content) message.value = content
            visible.value = true
        }

        function hide() {
            visible.value = false
        }

        return {
            visible,
            message,
            show,
            hide
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-loading {
    position: fixed;
    z-index: 1000;
    background: rgba(255, 255, 255, .65);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);

    :deep(.ant-spin-text) {
        margin-top: 12px;
    }
}
</style>
