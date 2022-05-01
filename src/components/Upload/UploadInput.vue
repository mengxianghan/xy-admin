<template>
    <a-input v-model:value="currentValue"
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
import {onMounted, ref, toRefs, watch} from 'vue'
import {Form} from 'ant-design-vue'
import api from '@/api'
import {STATUS_ENUM} from '@/components/Upload/config'

/**
 * 文件上传
 * @property {string} model-value v-model
 */
export default {
    name: 'XUploadInput',
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
        const currentValue = ref('')
        const {onFieldChange} = Form.useInjectFormItemContext()

        watch(() => modelValue.value, (val) => {
            currentValue.value = val
        })

        onMounted(() => {
            currentValue.value = modelValue.value
        })

        /**
         * 内容发生改变
         * @param e
         */
        function onInput(e) {
            trigger(e.target.value)
        }

        /**
         * 自定义上传
         * @param info
         */
        async function customRequest(info) {
            const {file} = info
            loading.value = true
            const {code, data} = await api.common.upload({
                file,
            })
            loading.value = false
            if (200 === code) {
                currentValue.value = data?.src
                trigger(currentValue.value)
            }
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
            currentValue,
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
