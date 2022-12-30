<template>
    <div class="x-editor">
        <a-spin :spinning="spinning">
            <tiny-editor
                v-model="content"
                v-bind="$attrs"
                api-key="d6vzo7lwm6my7lu42uk2jhnhui7cdk842rb0tzc6sfxgffgm"
                :init="opts"
                :disabled="disabled"
                :placeholder="placeholder"></tiny-editor>
        </a-spin>
    </div>
</template>

<script>
export default { name: 'XEditor' }
</script>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { mergeDeep } from '@/utils'
import { Form } from 'ant-design-vue'

import TinyEditor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'

import 'tinymce/themes/silver'
import 'tinymce/icons/default'

/**
 * @property {string} modelValue v-model
 * @property {object} options 配置
 * @property {number} height 高，默认：300
 * @property {string} placeholder 占位文案
 * @property {boolean} disabled 禁用，默认：false
 */

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    options: {
        type: Object,
        default: () => ({}),
    },
    height: {
        type: Number,
        default: 300,
    },
    placeholder: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const spinning = ref(true)
const content = ref('')
const opts = mergeDeep(
    {
        language_url: 'libs/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'libs/tinymce/skins/ui/oxide',
        content_css: 'libs/tinymce/skins/content/default/content.css',
        height: 480,
        branding: false,
        resize: false,
        content_style: `
                * {margin: 0; padding: 0; hyphens: auto;text-rendering: optimizeLegibility;-webkit-font-smoothing: antialiased;}
                body {font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif}
                .mce-content-body {margin: 12px;}
            `,
        setup: (editor) => {
            editor.on('init', () => {
                spinning.value = false
            })
        },
    },
    props.options
)
const { onFieldChange } = Form.useInjectFormItemContext()

watch(
    () => props.modelValue,
    (val) => (content.value = val)
)
watch(
    () => content.value,
    (val) => {
        emit('update:modelValue', val)
        onFieldChange()
    }
)

onMounted(() => {
    content.value = props.modelValue
    tinymce.init({})
})
</script>

<style lang="less" scoped>
.x-editor {
    textarea {
        display: none;
    }
}
</style>
