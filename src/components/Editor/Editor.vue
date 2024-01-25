<template>
    <div class="x-editor">
        <a-spin
            :spinning="spinning"
            size="small">
            <div class="x-editor__content">
                <tiny-editor
                    v-model="content"
                    :disabled="disabled"
                    :init="opts"
                    :placeholder="placeholder"
                    v-bind="$attrs"
                    @init="onInit"></tiny-editor>
            </div>
        </a-spin>
    </div>
</template>

<script setup>
import { Form, theme } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'
import TinyEditor from '@tinymce/tinymce-vue'
import { getContentStyle } from './utils'
import { omit } from 'lodash-es'

defineOptions({
    name: 'XEditor',
})

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    /**
     * 配置
     */
    option: {
        type: Object,
        default: () => ({}),
    },
    /**
     * 高，默认：300
     */
    height: {
        type: Number,
        default: 300,
    },
    /**
     * 占位文本
     */
    placeholder: {
        type: String,
        default: '',
    },
    /**
     * 禁用，默认：false
     */
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue', 'initialized'])

const { token } = theme.useToken()

const spinning = ref(true)
const content = ref('')
const opts = {
    language: 'zh-Hans',
    height: 480,
    branding: false,
    resize: false,
    promotion: false,
    content_style: getContentStyle(token.value, props.option.content_style),
    ...omit(props.option, ['content_style']),
}
const { onFieldChange } = Form.useInjectFormItemContext()

watch(
    () => props.modelValue,
    (val) => {
        if (val === content.value) return
        content.value = val
    }
)
watch(
    () => content.value,
    (val) => {
        emits('update:modelValue', val)
        onFieldChange()
    }
)

onMounted(() => {
    content.value = props.modelValue
    tinymce.init({})
})

/**
 * 初始化
 * @param e
 */
function onInit(e) {
    spinning.value = false
    emits('initialized', e.target)
}
</script>

<style lang="less">
@import './index.less';
</style>

<style lang="less" scoped>
.x-editor {
    &__content {
        min-height: 32px;

        .mce-content-body {
            margin: 0;
            border-radius: @border-radius;
            border: @color-border solid 1px;
            outline: none;
            padding: 4px 11px;
        }
    }

    textarea {
        display: none;
    }
}
</style>
