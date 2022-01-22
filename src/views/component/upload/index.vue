<template>
    <a-card title="基础示例">
        <a-row :gutter="16">
            <a-col>
                <x-upload-image v-model="basic"></x-upload-image>
            </a-col>
            <a-col>
                <x-upload-image v-model="customTitle"
                                text="自定义标题"
                                icon="icon-picture-outlined"></x-upload-image>

            </a-col>
            <a-col>
                <x-upload-image v-model="customSlot"
                                :width="240">
                    <div class="custom">
                        自定义插槽
                    </div>
                </x-upload-image>
            </a-col>
            <a-col>
                <x-upload-image v-model="cropper"
                                text="开启裁剪"
                                cropper
                                :aspect-ratio="1"></x-upload-image>

            </a-col>
            <a-col>
                <x-upload-image v-model="round"
                                round
                                text="圆角"></x-upload-image>
            </a-col>
        </a-row>
    </a-card>

    <a-card class="mt-8-2"
            title="批量上传示例">
        <x-upload-image v-model="multipleList"
                        multiple
                        cropper></x-upload-image>
    </a-card>

    <a-card class="mt-8-2"
            title="表单示例">
        <a-form :label-col="{style: {width: '100px'}}"
                :model="formState"
                :rules="rules"
                ref="formRef">
            <a-form-item label="身份证"
                         class="mb-0"
                         required>
                <a-row :gutter="16">
                    <a-col>
                        <a-form-item name="field1">
                            <x-upload-image v-model="formState.field1"
                                            text="人像面"
                                            :width="200"></x-upload-image>
                        </a-form-item>
                    </a-col>
                    <a-col>
                        <a-form-item name="field2">
                            <x-upload-image v-model="formState.field2"
                                            text="国徽面"
                                            :width="200"></x-upload-image>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item label="其他凭证"
                         name="field3">
                <x-upload-image v-model="formState.field3"></x-upload-image>
            </a-form-item>
            <a-form-item label="日期"
                         name="field4">
                <a-date-picker v-model="formState.field4"></a-date-picker>
            </a-form-item>
            <a-form-item :style="{paddingLeft: '100px'}">
                <a-space>
                    <a-button type="primary"
                              @click="handleSubmit">提交
                    </a-button>
                    <a-button @click="handleReset">重置</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script>
import {ref} from 'vue'

import useForm from '@/hooks/useForm'

export default {
    name: 'componentUpload',
    setup() {
        const basic = ref('')
        const customTitle = ref('')
        const customSlot = ref('')
        const cropper = ref('')
        const round = ref('')
        const multipleList = ref([])
        const {form, formState, rules, formRef, resetForm} = useForm()

        form.rules = {
            field1: {required: true, message: '请上传人像面'},
            field2: {required: true, message: '请上传国徽面'},
        }

        function handleSubmit() {
            formRef.value.validate().then((values) => {
                console.log(values)
            }).catch(() => {

            })
        }

        function handleReset() {
            resetForm()
        }

        return {
            basic,
            customTitle,
            customSlot,
            cropper,
            round,
            multipleList,
            formState,
            rules,
            formRef,
            handleSubmit,
            handleReset,
        }
    },
}
</script>

<style lang="less"
       scoped>
.custom {
    width: 240px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: @border-color-base dashed 1px;
    cursor: pointer;
    transition: all .15s;

    &:hover {
        border-color: @primary-color;
        color: @primary-color;
    }
}
</style>
