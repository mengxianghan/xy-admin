<script setup>
import { Form } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'XUploadInput',
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '选择文件',
  },
  loadingText: {
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
  },
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

<template>
  <a-input
    v-model:value="currentValue"
    :allow-clear="allowClear"
    class="x-upload x-upload-input"
    @input="onInput"
  >
    <template #addonAfter>
      <a-button
        v-if="loading"
        loading
      >
        {{ loadingText }}
      </a-button>
      <a-upload
        v-else
        :custom-request="customRequest"
        :show-upload-list="false"
      >
        <a-button>{{ text }}</a-button>
      </a-upload>
    </template>
  </a-input>
</template>

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
