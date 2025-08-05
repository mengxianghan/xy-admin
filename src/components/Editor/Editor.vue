<script setup>
import TinyEditor from '@tinymce/tinymce-vue'
import { Form, theme } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'
import { getContentStyle } from './utils'

defineOptions({
  name: 'XEditor',
})

const props = defineProps({
  modelValue: { type: String, default: '' },
  option: { type: Object, default: () => ({}) },
  height: { type: Number, default: 300 },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'initialized'])

const { token } = theme.useToken()

const spinning = ref(true)
const content = ref('')
const opts = {
  language: 'zh_CN',
  height: 480,
  branding: false,
  resize: false,
  promotion: false,
  highlight_on_focus: false,
  content_style: getContentStyle(token.value, props.option.content_style),
  ...omit(props.option, ['content_style']),
}
const { onFieldChange } = Form.useInjectFormItemContext()

watch(
  () => props.modelValue,
  (val) => {
    if (val === content.value)
      return
    content.value = val
  },
)
watch(
  () => content.value,
  (val) => {
    emit('update:modelValue', val)
    onFieldChange()
  },
)

onMounted(() => {
  content.value = props.modelValue
})

/**
 * 初始化
 * @param e
 */
function onInit(e) {
  spinning.value = false
  emit('initialized', e.target)
}
</script>

<template>
  <div class="x-editor">
    <a-spin
      :spinning="spinning"
      size="small"
    >
      <div class="x-editor__content">
        <tiny-editor
          v-model="content"
          :disabled="disabled"
          :init="opts"
          :placeholder="placeholder"
          license-key="gpl"
          tinymce-script-src="/libs/tinymce/tinymce.min.js"
          v-bind="$attrs"
          @init="onInit"
        />
      </div>
    </a-spin>
  </div>
</template>

<style lang="less">
@import 'index';
</style>

<style lang="less" scoped>
.x-editor {
  .x-editor__content {
    .mce-content-body {
      border: @color-border solid 1px;
      border-radius: @border-radius;
      min-height: 32px;
      padding: 4px 11px !important;
      outline: none;
      transition: all @motion-duration-mid;

      &:hover {
        border-color: @color-primary;
      }

      &.mce-edit-focus {
        box-shadow: 0 0 0 2px color(~`colorPalette('@{color-primary}', 1) `);
      }
    }
  }
}
</style>
