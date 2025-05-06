<script setup>
import { config } from '@/config'
import { findTree } from '@/utils'
import { Form, message } from 'ant-design-vue'
import { isEqual, isFunction, last, pick } from 'lodash-es'
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import { getSlotProps } from '../utils'

defineOptions({
  name: 'XCascader',
})

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  loadData: { type: [Array, Function], default: () => async function () {} },
  fieldNames: { type: Object, default: () => ({ label: 'label', value: 'value', children: 'children' }) },
  level: { type: Number, default: 1 },
})

const emit = defineEmits(['change', 'update:modelValue'])

const slots = useSlots()
const { onFieldChange } = Form.useInjectFormItemContext()

const options = ref([])
const curValue = ref([])

const cpLevel = computed(() => {
  return isFunction(props.loadData) ? props.level : props.loadData.length || 0
})

watch(
  () => props.modelValue,
  (val) => {
    if (!isEqual(val, curValue.value)) {
      getData(0, 1, val)
    }
  },
)

onMounted(() => {
  curValue.value = props.modelValue
  getData(0, 1, props.modelValue)
})

/**
 * 加载数据
 */
async function onLoadData(selectedOptions) {
  const targetOption = last(selectedOptions)
  await getData(targetOption[props.fieldNames.value] ?? 0, selectedOptions.length + 1)
}

/**
 * 获取数据
 * @param {number} value 上级
 * @param {number} level 层级
 * @param {Array} defaultValue 初始化默认值
 */
async function getData(value = 0, level = 1, defaultValue = []) {
  try {
    let targetOption = null
    // 从第二级开始查找父级
    if (level > 1) {
      findTree(
        options.value,
        value,
        (item) => {
          targetOption = item
        },
        { key: props.fieldNames.value, children: props.fieldNames.children },
      )
      targetOption.loading = true
    }
    const getData = isFunction(props.loadData) ? props.loadData : props.loadData[level - 1]
    const result = await getData({ level, value, selected: curValue.value })?.catch(() => {
      throw new Error('请求失败')
    })
    const { code, data } = result || {}
    if (targetOption) {
      targetOption.loading = false
    }
    if (config('http.code.success') === code) {
      const listData = data.map(item => ({
        ...item,
        isLeaf: level === cpLevel.value,
      }))
      // 判断层级
      if (!targetOption) {
        // 第一级直接赋值
        options.value = listData
      }
      else {
        // 从第二级开始填写子级
        targetOption.children = listData
        options.value = [...options.value]
      }
      // 回填默认值
      if (defaultValue && defaultValue.length && level < cpLevel.value) {
        const next = defaultValue[level - 1]
        if (next) {
          await getData(next, level + 1, defaultValue)
        }
      }
    }
  }
  catch (err) {
    message.error(err.message)
  }
}

/**
 * 发生改变
 */
function onChange(value, selectedOptions) {
  value = value || []
  selectedOptions = selectedOptions || []
  curValue.value = value
  emit('update:modelValue', value)
  emit(
    'change',
    value,
    selectedOptions.map(item => pick(item, [props.fieldNames.label, props.fieldNames.value])),
  )
  onFieldChange()
}
</script>

<template>
  <a-cascader
    :field-names="fieldNames"
    :load-data="onLoadData"
    :options="options"
    :value="curValue"
    @change="onChange"
  >
    <template
      v-for="(_, key) in slots"
      :key="key"
      #[key]="slotProps"
    >
      <slot
        :name="key"
        v-bind="getSlotProps(slotProps)"
      />
    </template>
  </a-cascader>
</template>

<style lang="less" scoped></style>
