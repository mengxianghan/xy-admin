<template>
    <a-input v-model:value="inputValue"
             class="x-upload x-upload-input"
             @input="onInput">
        <template #addonAfter>
            <a-button v-if="loading"
                      loading>上传中
            </a-button>
            <a-upload v-else
                      :show-upload-list="false"
                      :custom-request="customRequest">
                <a-button>选择文件</a-button>
            </a-upload>
        </template>
    </a-input>
</template>

<script>
import {ref, toRefs} from 'vue'
import {Form} from 'ant-design-vue'

/**
 * 文件上传
 * @property {string} model-value v-model
 */
export default {
    name: 'UploadInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    emit: ['update:modelValue'],
    setup(props, {emit}) {
        const {modelValue} = toRefs(props)
        const loading = ref(false)
        const inputValue = ref(modelValue?.value ?? '')
        const {onFieldChange} = Form.useInjectFormItemContext()

        function onInput(e) {
            trigger(e.target.value)
        }

        /**
         * 自定义上传
         * @param info
         */
        function customRequest(info) {
            const {file} = info
            loading.value = true
            setTimeout(() => {
                loading.value = false
                inputValue.value = URL.createObjectURL(file)
                trigger(inputValue.value)
            }, 3000)
        }

        /**
         * 触发
         */
        function trigger(value) {
            emit('update:modelValue', value)
            onFieldChange()
        }

        return {
            loading,
            inputValue,
            onInput,
            customRequest,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-upload {
    :deep(.ant-input-group-addon) {
        padding: 0;
        border: 0;
    }

    .ant-btn {
        margin: -1px 0 -1px -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
