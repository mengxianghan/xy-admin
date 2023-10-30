<template>
    <div class="x-tag-select">
        <div
            class="x-tag-select__content"
            ref="contentRef"
            :style="cpContentStyle">
            <slot>
                <tag-select-option
                    v-for="item in options"
                    :key="item[fieldNames.value]"
                    :value="item[fieldNames.value]">
                    <slot
                        name="option"
                        v-bind="item">
                        {{ item[fieldNames.label] }}
                    </slot>
                </tag-select-option>
            </slot>
        </div>
        <template v-if="collapsible">
            <div
                class="x-tag-select__collapse"
                @click="handleCollapse">
                <slot
                    name="collapse"
                    :collapsed="curCollapsed">
                    <template v-if="curCollapsed">展开</template>
                    <template v-else>收起</template>
                </slot>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed, watch } from 'vue'
import { Form } from 'ant-design-vue'
import TagSelectOption from './TagSelectOption.vue'
import { useTagSelectProvide } from './context'

defineOptions({
    name: 'XTagSelect',
})

/**
 * @property {array} options
 * @property {array|number|string} modelValue v-model
 * @property {boolean} multiple 是否多选，默认：false
 * @property {boolean} collapsible 是否可收起，默认：false
 * @property {boolean} collapsed 收起状态，默认：true
 * @property {object} fieldNames 自定义节点字段，默认：{ label: 'label', value: 'value' }
 */
const props = defineProps({
    modelValue: {
        type: [Array, Number, String],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
        default: () => [],
    },
    collapsible: {
        type: Boolean,
        default: false,
    },
    collapsed: {
        type: Boolean,
        default: true,
    },
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

const contentRef = ref()
const curCollapsed = ref(props.collapsed)
const curValue = ref()

const state = reactive({
    defaultHeight: null,
    height: null,
})

const cpContentStyle = computed(() => {
    return {
        height: props.collapsible ? (curCollapsed.value ? `${state.defaultHeight}px` : '') : '',
    }
})

watch(
    () => props.modelValue,
    (val) => {
        if (val === curValue.value) return
        curValue.value = val
    },
    { immediate: true }
)

watch(
    () => props.collapsed,
    (val) => {
        if (val === curCollapsed.value) return
        curCollapsed.value = val
    }
)

onMounted(async () => {
    await nextTick()
    state.defaultHeight = parseInt(window.getComputedStyle(contentRef.value).getPropertyValue('line-height'))
    state.height = contentRef.value.offsetHeight
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
    const { multiple } = props

    if (multiple) {
        curValue.value = Array.isArray(curValue.value) ? curValue.value : []
        const index = curValue.value?.indexOf(value)
        if (index === -1) {
            curValue.value?.push(value)
        } else {
            curValue.value?.splice(index, 1)
        }
    } else {
        curValue.value = value
    }
    trigger()
}

function trigger() {
    const { multiple, fieldNames, options } = props
    const { value: valueKey } = fieldNames
    let selectedOptions

    if (multiple) {
        selectedOptions = options.filter((item) => curValue.value?.includes(item[valueKey]))
    } else {
        selectedOptions = options.find((item) => item[valueKey] === curValue.value)
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

<style lang="less" scoped>
.x-tag-select {
    display: flex;

    &__content {
        flex: 1;
        overflow: hidden;
    }

    &__collapse {
        margin: 0 0 0 8px;
        flex-shrink: 0;
        color: @color-primary;
        cursor: pointer;
    }
}
</style>
