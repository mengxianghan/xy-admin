<template>
    <div class="x-editor">
        <a-spin
            size="small"
            :spinning="spinning">
            <div class="x-editor__content">
                <tiny-editor
                    v-model="content"
                    v-bind="$attrs"
                    api-key=""
                    :init="opts"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    @init="onInit"></tiny-editor>
            </div>
        </a-spin>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { deepMerge } from '@/utils'
import { Form } from 'ant-design-vue'
import TinyEditor from '@tinymce/tinymce-vue'

/**
 * @property {string} modelValue v-model
 * @property {object} options 配置
 * @property {number} height 高，默认：300
 * @property {string} placeholder 占位文案
 * @property {boolean} disabled 禁用，默认：false
 */
export default {
    name: 'XEditor',
    components: { TinyEditor },
    props: {
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
    },
    emits: ['update:modelValue', 'ready'],
    setup(props, { emit }) {
        const spinning = ref(true)
        const content = ref('')
        const opts = deepMerge(
            {
                language: 'zh-Hans',
                height: 480,
                branding: false,
                resize: false,
                promotion: false,
                content_style: `
                * {margin: 0; padding: 0; hyphens: auto;text-rendering: optimizeLegibility;-webkit-font-smoothing: antialiased;}
                body {font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif}
                .mce-content-body {margin: 12px; font-size: 14px;}
            `,
            },
            props.options
        )
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
                emit('update:modelValue', val)
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
            emit('ready', e.target)
        }

        return {
            spinning,
            content,
            opts,
            onInit,
        }
    },
}
</script>

<style lang="less">
@import './index.less';
</style>

<style lang="less" scoped>
.x-editor {
    &__content {
        min-height: 32px;
    }

    textarea {
        display: none;
    }
}
</style>