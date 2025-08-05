<script setup>
import { Form } from 'ant-design-vue'
import { debounce, filter, findIndex, isFunction, last } from 'lodash-es'
import { computed, nextTick, ref, useSlots, watch, watchEffect } from 'vue'
import { findTree, isEmpty } from '@/utils'
import { useInfiniteScroll } from '../InfiniteScroll'
import { formatUnits, getSlotProps } from '../utils'
import { DIRECTION_ENUM } from './config'
import { useTransferProvide } from './context'
import TransferList from './TransferList.vue'

defineOptions({
  name: 'XTransfer',
})

const props = defineProps({
  loading: { type: Boolean, default: false },
  dataSource: { type: Array, default: () => [] },
  fieldNames: { type: Object, default: () => ({ label: 'label', value: 'value', children: 'children' }) },
  clearText: { type: String, default: '清除' },
  placeholder: String,
  showSearch: { type: Boolean, default: true },
  showCheckAll: { type: Boolean, default: false },
  filterOption: { type: Function },
  locale: { type: Object, default: () => ({ emptyText: '暂无数据' }) },
  loadData: { type: Function },
  height: { type: [Number, String], default: 400 },
  immediateCheck: { type: Boolean, default: true },
})
const emit = defineEmits(['change'])
const modelValue = defineModel('modelValue', { type: Array, default: () => [] })
const selectedRows = defineModel('selectedRows', { type: Array, default: () => [] })
const slots = useSlots()
const {
  initInfiniteScroll,
  showLoading,
  hideLoading,
  showError,
  showFinished,
  resetInfiniteScroll,
  loading: infiniteLoading,
  loadingText,
  finished,
  finishedText,
  error,
  errorText,
} = useInfiniteScroll({ immediateCheck: false })
const { onFieldChange } = Form.useInjectFormItemContext()

const onSearch = debounce(() => {
  reloadData()
}, 500)

const dataList = ref(props.dataSource)
const keyword = ref('')
const breadcrumb = ref([])

const cpIsDynamicLoadData = computed(() => isFunction(props.loadData))
const cpDataList = computed(() =>
  filter(dataList.value, (item) => {
    if (cpIsDynamicLoadData.value) {
      return true
    }
    if (isFunction(props.filterOption)) {
      return props.filterOption(keyword.value, item)
    }
    if (!isEmpty(keyword.value)) {
      return item[props.fieldNames.label].includes(keyword.value)
    }
    return true
  }),
)
const cpStyle = computed(() => {
  return {
    height: formatUnits(props.height),
  }
})

watch(
  () => modelValue.value,
  () => {
    if (cpIsDynamicLoadData.value) {
      return
    }
    const result = []
    modelValue.value.forEach((item) => {
      findTree(
        props.dataSource,
        item,
        (item) => {
          result.push(item)
        },
        { key: props.fieldNames.value, children: props.fieldNames.children },
      )
    })
    selectedRows.value = result
  },
  {
    immediate: true,
    deep: true,
  },
)

watchEffect(() => {
  const record = last(breadcrumb.value)
  if (record && !cpIsDynamicLoadData.value) {
    findTree(
      props.dataSource,
      record[props.fieldNames.value],
      (item) => {
        dataList.value = item?.[props.fieldNames.children] || []
      },
      { key: props.fieldNames.value, children: props.fieldNames.children },
    )
  }
  else {
    dataList.value = props.dataSource || []
  }
})

/**
 * 清除
 */
function onClear() {
  selectedRows.value = filter(selectedRows.value, item => item.disabled)
  onTrigger()
}

/**
 * 选择/取消选择
 * @param selectedRow
 * @param checked
 */
function onItemCheck({ selectedRow, checked }) {
  if (checked) {
    selectedRows.value.push(selectedRow)
  }
  else {
    selectedRows.value.splice(getSelectedRowIndex(selectedRow), 1)
  }
  onTrigger()
}

/**
 * 全选
 * @param checked
 */
function onItemCheckAll({ checked }) {
  if (checked) {
    // 全选，将可操作项添加到已选列表
    filter(cpDataList.value, item => !item.disabled)?.forEach((item) => {
      if (getSelectedRowIndex(item) < 0) {
        selectedRows.value.push(item)
      }
    })
  }
  else {
    // 取消全选，将可操作项从已选列表中移除
    filter(cpDataList.value, item => !item.disabled).forEach((item) => {
      selectedRows.value.splice(getSelectedRowIndex(item), 1)
    })
  }
  onTrigger()
}

/**
 * 进入下级
 * @param record
 */
function onNext(record) {
  keyword.value = ''
  breadcrumb.value.push(record)
  reloadData()
}

/**
 * 点击面包屑导航
 * @param record
 * @param index
 */
function onBreadcrumb(record, index) {
  keyword.value = undefined
  if (record) {
    breadcrumb.value.splice(index + 1)
  }
  else {
    breadcrumb.value = []
  }
  reloadData()
}

/**
 * 加载数据
 * @param {object} payload
 * @param {boolean} payload.reload
 */
function onLoadData(payload) {
  if (!isFunction(props.loadData))
    return
  const record = last(breadcrumb.value) || null
  const { reload } = payload
  props.loadData({
    record,
    reload,
    keyword: keyword.value,
  })
}

/**
 * 发生改变
 */
async function onTrigger() {
  await nextTick()
  const selectedKeys = selectedRows.value.map(item => item[props.fieldNames.value])
  modelValue.value = selectedKeys
  emit('change', selectedKeys, { selectedRows: selectedRows.value })
  onFieldChange()
}

/**
 * 重新加载
 */
function reloadData() {
  if (!cpIsDynamicLoadData.value) {
    return
  }
  resetInfiniteScroll()
  onLoadData({ reload: true })
}

/**
 * 获取选中的索引
 * @param record
 * @returns {number}
 */
function getSelectedRowIndex(record) {
  return findIndex(selectedRows.value, item => item[props.fieldNames.value] === record[props.fieldNames.value])
}

useTransferProvide({
  fieldNames: computed(() => props.fieldNames),
  modelValue: computed(() => modelValue.value),
  breadcrumb: computed(() => breadcrumb.value),
  clearText: computed(() => props.clearText),
  placeholder: computed(() => props.placeholder),
  showSearch: computed(() => props.showSearch),
  showCheckAll: computed(() => props.showCheckAll),
  locale: computed(() => props.locale),
  immediateCheck: computed(() => props.immediateCheck),
  loading: computed(() => infiniteLoading.value),
  loadingText: computed(() => loadingText.value),
  finished: computed(() => finished.value),
  finishedText: computed(() => finishedText.value),
  error: computed(() => error.value),
  errorText: computed(() => errorText.value),
  isDynamicLoadData: computed(() => cpIsDynamicLoadData.value),
  keyword,
  onItemCheck,
  onItemCheckAll,
  onClear,
  onNext,
  onBreadcrumb,
  initInfiniteScroll,
  onLoadData,
  onSearch,
})

defineExpose({
  showLoading,
  hideLoading,
  showFinished,
  showError,
})
</script>

<template>
  <div
    v-loading="loading"
    :style="cpStyle"
    class="x-transfer"
  >
    <transfer-list
      :data-source="cpDataList"
      :direction="DIRECTION_ENUM.getValue('left')"
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
    </transfer-list>
    <transfer-list
      :data-source="selectedRows"
      :direction="DIRECTION_ENUM.getValue('right')"
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
    </transfer-list>
  </div>
</template>

<style lang="less" scoped>
.x-transfer {
  display: flex;
  border: @color-border solid 1px;
  border-radius: @border-radius;
}
</style>
