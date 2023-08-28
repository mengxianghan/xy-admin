<template>
    <a-cascader
        v-bind="$attrs"
        :value="curValue"
        :options="options"
        :load-data="onLoadData"
        :field-names="fieldNames"
        @change="onChange"></a-cascader>
</template>

<script setup>
import { Form, message } from 'ant-design-vue'
import { last, pick } from 'lodash-es'
import { computed, onMounted, ref, watch } from 'vue'
import { config } from '@/config'
import { findTree } from '@/utils/util'

defineOptions({
    name: 'XCascader',
})
/**
 * 地区联动
 * 使用场景：通过接口获取下级数据
 * 温馨提示：如果不需要通过接口获取下级数据时建议使用 AntDesign 中的 Cascader 组件
 * @property {array} value
 * @property {function | array} loadData
 * @property {object} filedNames
 * @property {number} maxLevel  最深层级，默认：1；
 *                              loadData 为 function 类型时可以用它来控制数据的最深层级
 *                              loadData 为 array 类型时，通过数组长度自动计算最多层级
 */
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    loadData: {
        type: [Array, Function],
        default: () => async function () {},
    },
    fieldNames: {
        type: Object,
        default: () => ({ label: 'label', value: 'value', children: 'children' }),
    },
    maxLevel: {
        type: Number,
        default: 1,
    },
})

const emit = defineEmits(['change', 'update:modelValue'])

const { onFieldChange } = Form.useInjectFormItemContext()

const options = ref([])
const curValue = ref([])

const cpMaxLevel = computed(() => {
    return typeof props.loadData === 'function' ? props.maxLevel : props.loadData.length || 0
})

watch(
    () => props.modelValue,
    (val) => {
        if (val !== curValue.value) {
            getData(0, 1, val)
        }
    }
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
 * @param {array} defaultValue 初始化默认值
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
                { key: props.fieldNames.value, children: props.fieldNames.children }
            )
            targetOption.loading = true
        }
        const getData = typeof props.loadData === 'function' ? props.loadData : props.loadData[level - 1]
        if (Object.prototype.toString.call(getData) !== '[object AsyncFunction]') {
            throw new Error('请使用异步函数获取数据')
        }
        const result = await getData({ level, value, selected: curValue.value })?.catch(() => {
            throw new Error('请求失败')
        })
        const { code, data } = result || {}
        if (targetOption) {
            targetOption.loading = false
        }
        if (config('http.code.success') === code) {
            const listData = data.map((item) => ({
                ...item,
                isLeaf: level === cpMaxLevel.value,
            }))
            // 判断层级
            if (!targetOption) {
                // 第一级直接赋值
                options.value = listData
            } else {
                // 从第二级开始填写子级
                targetOption.children = listData
                options.value = [...options.value]
            }
            // 回填默认值
            if (defaultValue && defaultValue.length && level < cpMaxLevel.value) {
                const next = defaultValue[level - 1]
                if (next) {
                    await getData(next, level + 1, defaultValue)
                }
            }
        }
    } catch (err) {
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
        selectedOptions.map((item) => pick(item, [props.fieldNames.label, props.fieldNames.value]))
    )
    onFieldChange()
}
</script>

<style lang="less" scoped></style>
