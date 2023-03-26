<template>
    <div>
        <a-card :bordered="false">
            <x-editor v-model="content" />
        </a-card>
        <a-card
            v-if="content"
            :bordered="false"
            title="输出"
            class="mt-8-2">
            {{ content }}
        </a-card>
        <a-card
            :bordered="false"
            title="表单示例"
            class="mt-8-2">
            <a-form
                :label-col="{ style: { width: '100px' } }"
                :model="formState"
                :rules="rules"
                ref="formRef">
                <a-form-item
                    label="字段 1"
                    name="field1">
                    <x-editor v-model="formState.field1" />
                </a-form-item>
                <a-form-item :style="{ paddingLeft: '100px' }">
                    <a-space>
                        <a-button
                            type="primary"
                            @click="handleSubmit"
                            >提交
                        </a-button>
                        <a-button @click="handleReset">重置</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script>
import { ref } from 'vue'
import useForm from '@/hooks/useForm'

export default {
    name: 'componentEditor',
    setup() {
        const { formState, rules, formRef, resetForm } = useForm()
        const content = ref('')

        rules.value = {
            field1: { required: true, message: '请输入内容' },
        }

        function handleSubmit() {
            formRef.value
                .validate()
                .then((values) => {
                    console.log(values)
                })
                .catch(() => {})
        }

        function handleReset() {
            resetForm()
        }

        return {
            content,
            rules,
            formRef,
            formState,
            handleReset,
            handleSubmit,
        }
    },
}
</script>

<style lang="less" scoped></style>
