<script setup>
import { Form } from 'ant-design-vue'
import { debounce, head } from 'lodash-es'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useTagSelectProvide } from './context'
import TagSelectOption from './TagSelectOption.vue'

defineOptions({
  name: 'XTagSelect',
})

const props = defineProps({
  modelValue: {
    type: [Array, Number, String],
  },
  /**
   * 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 选项
   */
  options: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否可收起
   */
  collapsible: {
    type: Boolean,
    default: true,
  },
  /**
   * 收起状态
   */
  collapsed: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义节点字段
   */
  fieldNames: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
    }),
  },
})

const emit = defineEmits(['update:collapsed', 'update:modelValue', 'collapse', 'change'])

const { onFieldChange } = Form.useInjectFormItemContext()

const tagSelectRef = ref()
const contentRef = ref()
const curCollapsed = ref(props.collapsed)
const curValue = ref()
const curCollapsible = ref(false)

const state = reactive({
  defaultHeight: null,
  height: null,
  observer: null,
})

const cpTagSelectStyle = computed(() => {
  return {
    height: props.collapsible ? (curCollapsed.value ? `${state.defaultHeight}px` : '') : '',
  }
})

watch(
  () => props.modelValue,
  (val) => {
    if (val === curValue.value)
      return
    curValue.value = val
  },
  { immediate: true },
)

watch(
  () => props.collapsed,
  (val) => {
    if (val === curCollapsed.value)
      return
    curCollapsed.value = val
  },
)

watch(
  () => props.collapsible,
  (val) => {
    curCollapsible.value = val
  },
)

onMounted(async () => {
  await nextTick()
  state.defaultHeight = Number.parseInt(window.getComputedStyle(tagSelectRef.value).getPropertyValue('line-height'))
  state.height = tagSelectRef.value.offsetHeight

  if (props.collapsible) {
    state.observer = new ResizeObserver(
      debounce((entries) => {
        const entry = head(entries)
        const { contentRect } = entry || {}
        curCollapsible.value = contentRect.height > state.defaultHeight
      }, 100),
    )

    state.observer.observe(contentRef.value)
  }
})

onBeforeUnmount(() => {
  state.observer?.unobserve?.(contentRef.value)
  state.observer = null
})

/**
 * 展开收起
 */
function handleCollapse() {
  curCollapsed.value = !curCollapsed.value
  emit('update:collapsed', curCollapsed.value)
  emit('collapse', curCollapsed.value)
}

/**
 * 选择
 */
function onSelect(value) {
  const { multiple, options, fieldNames } = toRefs(props)
  const valueKey = fieldNames.value?.value
  const record = options.value.find(item => item[valueKey] === value)
  const isUnlimited = record?.unlimited

  // 多选
  if (multiple.value) {
    curValue.value = Array.isArray(curValue.value) ? curValue.value : []
    const index = curValue.value?.indexOf(value)
    const unlimitedOptions = options.value.filter(item => item.unlimited)

    if (isUnlimited) {
      // 点击的是不限选项，清空已选
      curValue.value = []

      if (typeof record[valueKey] === 'undefined') {
        trigger()
        return
      }
    }
    else {
      // 点击的是其他，从已选中将不限选项移除
      unlimitedOptions.forEach((item) => {
        const index = curValue.value?.indexOf(item[valueKey])
        if (index > -1) {
          curValue.value.splice(index, 1)
        }
      })
    }

    if (index === -1) {
      curValue.value?.push(value)
    }
    else {
      curValue.value?.splice(index, 1)
    }

    // 如果选中项为空，默认选中不限选项
    if (!curValue.value.length) {
      unlimitedOptions.forEach((item) => {
        if (typeof item[valueKey] !== 'undefined') {
          curValue.value.push(item[valueKey])
        }
      })
    }

    trigger()
    return
  }

  curValue.value = value
  trigger()
}

function trigger() {
  const { multiple, fieldNames, options } = props
  const { value: valueKey } = fieldNames
  let selectedOptions

  if (multiple) {
    selectedOptions = options.filter(item => curValue.value?.includes(item[valueKey]))
  }
  else {
    selectedOptions = options.find(item => item[valueKey] === curValue.value)
  }
  emit('update:modelValue', curValue.value)
  emit('change', curValue.value, selectedOptions)
  onFieldChange()
}

useTagSelectProvide({
  onSelect,
  modelValue: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
})
</script>

<template>
  <div
    ref="tagSelectRef"
    :style="cpTagSelectStyle"
    class="x-tag-select"
  >
    <div
      ref="contentRef"
      class="x-tag-select__content"
    >
      <slot>
        <tag-select-option
          v-for="item in options"
          :key="item[fieldNames.value] ?? item.label"
          :record="item"
          :value="item[fieldNames.value]"
        >
          <slot
            name="option"
            v-bind="item"
          >
            {{ item[fieldNames.label] }}
          </slot>
        </tag-select-option>
      </slot>
    </div>
    <template v-if="curCollapsible">
      <div
        class="x-tag-select__collapse"
        @click="handleCollapse"
      >
        <slot
          :collapsed="curCollapsed"
          name="collapse"
        >
          <template v-if="curCollapsed">
            展开
          </template>
          <template v-else>
            收起
          </template>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.x-tag-select {
  display: flex;
  align-items: flex-start;
  overflow: hidden;

  &__content {
    flex: 1;
    height: max-content;
  }

  &__collapse {
    margin: 0 0 0 8px;
    flex-shrink: 0;
    color: @color-primary;
    cursor: pointer;
  }
}
</style>
