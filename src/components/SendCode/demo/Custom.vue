<demo>
## 自定义
定义按钮样式，并将时长设置为 10s。
</demo>

<!-- #region snippet -->
<template>
    <div>
        <a-input :style="{ width: '260px' }">
            <template #suffix>
                <x-send-code
                    ref="sendCodeRef"
                    :seconds="10">
                    <template #default="{ running, seconds }">
                        <template v-if="running">{{ seconds }}s 后重新获取</template>
                        <template v-else>
                            <a @click="handleSend"> 发送验证码 </a>
                        </template>
                    </template>
                </x-send-code>
            </template>
        </a-input>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const sendCodeRef = ref()

function handleSend() {
    sendCodeRef.value.start()
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
