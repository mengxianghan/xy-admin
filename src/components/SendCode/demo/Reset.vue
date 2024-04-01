<demo>
## 重置
发送失败后可以重置回初始状态
</demo>

<!-- #region snippet -->
<template>
    <div>
        <a-space>
            <x-send-code ref="sendCodeRef">
                <template #default="{ running, seconds, disabled }">
                    <a-button
                        :disabled="disabled"
                        @click="handleSend">
                        <template v-if="running">{{ seconds }}s 后重新获取</template>
                        <template v-else>发送验证码</template>
                    </a-button>
                </template>
            </x-send-code>
            <template v-if="allowReset">
                <a-button @click="handleReset">重置</a-button>
            </template>
        </a-space>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const sendCodeRef = ref()
const allowReset = ref(false)

function handleSend() {
    sendCodeRef.value.start()
    allowReset.value = true
}

function handleReset() {
    sendCodeRef.value.reset()
    allowReset.value = false
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
