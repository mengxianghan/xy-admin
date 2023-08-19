<template>
    <div>
        <a-form
            :model="formData"
            :label-col="{ lg: { span: 5 }, sm: { span: 5 } }"
            :wrapper-col="{ lg: { span: 19 }, sm: { span: 19 } }"
            ref="formRef"
            :rules="formRules">
            <a-form-item
                label="付款账户"
                name="paymentUser">
                <a-select
                    v-model:value="formData.paymentUser"
                    placeholder="******@***.com">
                    <a-select-option value="1">******@***.com</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="收款账户"
                name="payType">
                <a-input-group
                    style="display: inline-block; vertical-align: middle"
                    :compact="true">
                    <a-form-item-rest>
                        <a-select
                            default-value="alipay"
                            style="width: 100px">
                            <a-select-option value="alipay">支付宝</a-select-option>
                            <a-select-option value="wexinpay">微信</a-select-option>
                        </a-select>
                    </a-form-item-rest>
                    <a-input
                        v-model:value="formData.payType"
                        :style="{ width: 'calc(100% - 100px)' }" />
                </a-input-group>
            </a-form-item>
            <a-form-item
                label="收款人姓名"
                name="name">
                <a-input v-model:value="formData.name" />
            </a-form-item>
            <a-form-item
                label="转账金额"
                name="money">
                <a-input
                    v-model:value="formData.money"
                    prefix="￥" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
                <a-button
                    type="primary"
                    @click="handleNext"
                    >下一步
                </a-button>
            </a-form-item>
        </a-form>
        <a-divider />
        <div class="color-secondary">
            <h3>说明</h3>
            <h4>转账到支付宝账户</h4>
            <p>
                如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
            <h4>转账到银行卡</h4>
            <p>
                如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '@/hooks'

defineOptions({
    name: 'Step1',
})

const emit = defineEmits(['next'])

const { formData, formRef, formRules } = useForm()

formRules.value = {
    paymentUser: [{ required: true, message: '付款账户必须填写' }],
    payType: [{ required: true, message: '收款账户必须填写' }],
    name: [{ required: true, message: '收款人名称必须核对' }],
    money: [{ required: true, message: '转账金额必须填写' }],
}

/**
 * 下一步
 */
function handleNext() {
    formRef.value
        .validate()
        .then(() => {
            emit('next')
        })
        .catch(() => {})
}
</script>

<style lang="less" scoped></style>
