<template>
    <div>
        <a-form
            ref="formRef"
            :model="formData"
            :label-col="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapper-col="{ lg: { span: 19 }, sm: { span: 19 } }"
            :rules="formRules">
            <a-alert
                message="确认转账后，资金将直接打入对方账户，无法退回。"
                :style="{ marginBottom: '24px' }"
                :closable="true" />
            <a-form-item label="付款账户"> ****@***.com </a-form-item>
            <a-form-item label="收款账户"> test@example.com </a-form-item>
            <a-form-item label="收款人姓名"> Alex </a-form-item>
            <a-form-item label="转账金额"> ￥ 5,000.00 </a-form-item>
            <a-divider />
            <a-form-item
                label="支付密码"
                name="paymentPassword">
                <a-input
                    v-model:value="formData.paymentPassword"
                    type="password"
                    :style="{ width: '80%' }" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
                <a-space>
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="handleNext">
                        提交
                    </a-button>
                    <a-button @click="handlePrev">上一步 </a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@/hooks'

defineOptions({
    name: 'Step2',
})

const emit = defineEmits(['next', 'prev'])

const { formData, formRules, formRef } = useForm()
const loading = ref(false)

formRules.value = {
    paymentPassword: [{ required: true, message: '请输入支付密码' }],
}

/**
 * 下一步
 */
function handleNext() {
    loading.value = true
    formRef.value
        .validate()
        .then(() => {
            setTimeout(() => {
                loading.value = false
                emit('next')
            }, 1500)
        })
        .catch(() => {
            loading.value = false
        })
}

/**
 * 上一步
 */
function handlePrev() {
    emit('prev')
}
</script>

<style lang="less" scoped></style>
