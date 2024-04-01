<demo>
## 基础用法
告别复杂的倒计时逻辑，默认 60s。
</demo>

<!-- #region snippet -->
<template>
    <div>
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
