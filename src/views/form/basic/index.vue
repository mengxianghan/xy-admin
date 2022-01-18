<template>
    <a-card>
        <a-form :label-col="{sm: 7, lg:7}"
                :wrapper-col="{sm: 17, lg: 10}"
                ref="formRef"
                :rules="rules"
                :model="model">
            <a-form-item label="标题"
                         name="title">
                <a-input placeholder="给目标起个名字"
                         v-model:value="model.title"></a-input>
            </a-form-item>
            <a-form-item label="起止日期">
                <a-range-picker></a-range-picker>
            </a-form-item>
            <a-form-item label="目标描述">
                <a-textarea placeholder="请输入你的阶段性工作目标"
                            :rows="4"></a-textarea>
            </a-form-item>
            <a-form-item label="衡量标准">
                <a-textarea placeholder="请输入衡量标准"
                            :rows="4"></a-textarea>
            </a-form-item>
            <a-form-item label="客户（选填）">
                <a-input placeholder="请描述你服务的客户,内部客户直接 姓名/工号"></a-input>
            </a-form-item>
            <a-form-item label="邀评人（选填）">
                <a-input placeholder="请直接 姓名/工号,最多可邀请 5 人"></a-input>
            </a-form-item>
            <a-form-item label="权重（选填）">
                <a-input placeholder="请输入"></a-input>
            </a-form-item>
            <a-form-item label="目标公开">
                <a-radio-group :options="targetList"></a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{offset: 7, sm: 17, lg: 10}">
                <a-space>
                    <a-button type="primary">提交</a-button>
                    <a-button>取消</a-button>
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
            {label: '公开', value: 1},
            {label: '部分公开', value: 2},
            {label: '不公开', value: 3},
        ]
        const {formRef, model, rules} = useForm()

        rules.value = {
            title: {required: true, message: '请输入标题'}
        }

        return {
            targetList,
            formRef,
            model,
            rules,
        }
    },
}
</script>

<style scoped>

</style>
