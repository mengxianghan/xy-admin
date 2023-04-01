<template>
    <a-card :bordered="false">
        <a-form
            :label-col="{ sm: 7, lg: 7 }"
            :wrapper-col="{ sm: 17, lg: 10 }"
            ref="formRef"
            :rules="formRules"
            :model="formState">
            <a-form-item
                label="标题"
                name="field1">
                <a-input
                    v-model:value="formState.field1"
                    placeholder="给目标起个名字"></a-input>
            </a-form-item>
            <a-form-item
                label="起止日期"
                name="field2">
                <a-range-picker v-model:value="formState.field2"></a-range-picker>
            </a-form-item>
            <a-form-item
                label="目标描述"
                name="field3">
                <a-textarea
                    v-model:value="formState.field3"
                    placeholder="请输入你的阶段性工作目标"
                    :rows="4"></a-textarea>
            </a-form-item>
            <a-form-item
                label="衡量标准"
                name="field4">
                <a-textarea
                    v-model:value="formState.field4"
                    placeholder="请输入衡量标准"
                    :rows="4"></a-textarea>
            </a-form-item>
            <a-form-item name="field5">
                <template #label>
                    客户（选填）
                    <a-tooltip title="目标的服务对象">
                        <icon-info-circle-outlined />
                    </a-tooltip>
                </template>
                <a-input
                    v-model:value="formState.field5"
                    placeholder="请描述你服务的客户,内部客户直接 姓名/工号"></a-input>
            </a-form-item>
            <a-form-item
                label="邀评人（选填）"
                name="field6">
                <a-input
                    v-model:value="formState.field6"
                    placeholder="请直接 姓名/工号,最多可邀请 5 人"></a-input>
            </a-form-item>
            <a-form-item
                label="权重（选填）"
                name="field7">
                <a-input
                    v-model:value="formState.field7"
                    placeholder="请输入"></a-input>
            </a-form-item>
            <a-form-item
                label="目标公开"
                name="field8">
                <a-radio-group
                    v-model:value="formState.field8"
                    :options="targetList"></a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 7, sm: 17, lg: 10 }">
                <a-space>
                    <a-button
                        type="primary"
                        @click="handleOk">
                        提交
                    </a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script>
import useForm from '@/hooks/useForm'

export default {
    name: 'formBasic',
    setup() {
        const targetList = [
            { label: '公开', value: 1 },
            { label: '部分公开', value: 2 },
            { label: '不公开', value: 3 },
        ]
        const { formRef, formState, formRules, resetForm } = useForm()

        formState.value = {
            field8: 1,
        }

        formRules.value = {
            field1: { required: true, message: '请输入标题' },
            field2: { required: true, message: '请选择起止日期' },
            field3: { required: true, message: '请输入目标描述' },
            field4: { required: true, message: '请输入衡量标准' },
        }

        /**
         * 提交表单
         */
        function handleOk() {
            formRef.value.validateFields().then((values) => {
                console.log(values)
            })
        }

        /**
         * 取消
         */
        function handleCancel() {
            resetForm()
        }

        return {
            formRef,
            formRules,
            formState,
            targetList,
            handleOk,
            handleCancel,
        }
    },
}
</script>

<style lang="less" scoped></style>
