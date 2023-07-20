<template>
    <a-input
        v-model:value="currentValue"
        class="x-upload x-upload-input"
        :allow-clear="allowClear"
        @input="onInput">
        <template #addonAfter>
            <a-button
                v-if="loading"
                loading>
                {{ loadingBtnText }}
            </a-button>
            <a-upload
                v-else
                :show-upload-list="false"
                :custom-request="customRequest">
                <a-button>{{ btnText }}</a-button>
            </a-upload>
        </template>
    </a-input>
</template>

<script setup>
import { Form } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'

defineOptions({
    name: 'XUploadInput',
})

/**
 * 文件上传
 * @property {string} modelValue v-model
 * @property {string} btnText 按钮内容。默认：选择文件
 * @property {string} loadingBtnText 上传中按钮内容。默认：上传中
 * @property {boolean} allowClear 允许清空。默认：true
 */
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    btnText: {
        type: String,
        default: '选择文件',
    },
    loadingBtnText: {
        type: String,
        default: '上传中',
    },
    allowClear: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['update:modelValue', 'change'])

const { onFieldChange } = Form.useInjectFormItemContext()
const loading = ref(false)
const currentValue = ref('')

watch(
    () => props.modelValue,
    (val) => {
        if (currentValue.value !== val) {
            currentValue.value = val
        }
    }
)

onMounted(() => {
    currentValue.value = props.modelValue
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
    const { file } = info

    // 演示
    loading.value = true
    setTimeout(() => {
        loading.value = false
        currentValue.value = file.name
        trigger(currentValue.value)
    }, 2000)

    // 真实业务场景
    // loading.value = true
    // const { code, data } = await apis.common.upload({
    //     file,
    // })
    // loading.value = false
    // if (config('http.code.success') === code) {
    //     currentValue.value = data?.src
    //     trigger(currentValue.value)
    // }
}

/**
 * 触发
 */
function trigger(value) {
    emit('update:modelValue', value)
    emit('change', value)
    onFieldChange()
}
</script>

<style lang="less" scoped>
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
