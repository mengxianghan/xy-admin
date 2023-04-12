<template>
    <a-cascader
        :value="modelValue"
        :options="options"
        :placeholder="placeholder"
        :load-data="onLoadData"
        v-bind="$attrs"
        @change="onChange"></a-cascader>
</template>

<script>
import { findTree, mapping } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import { message, Form } from 'ant-design-vue'
import { last, pick } from 'lodash-es'
import { CODE_SUCCESS } from '@/config/http'

/**
 * 地区联动
 * @property {array} modelValue v-model
 * @property {string} placeholder
 */
export default {
    name: 'XRegion',
    props: {
        modelValue: {
            type: Array,
            default: () => [],
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const { onFieldChange } = Form.useInjectFormItemContext()

        const maxLevel = ref(3)
        const options = ref([])
        const curValue = ref([])

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
         * 获取数据
         * @param {number} value 上级
         * @param {number} level 层级
         * @param {array} defaultValue 初始化默认值
         */
        async function getData(value = 0, level = 1, defaultValue = []) {
            try {
                let targetOption = null
                let result
                // 从第二级开始查找父级
                if (level > 1) {
                    findTree(
                        options.value,
                        value,
                        (item) => {
                            targetOption = item
                        },
                        { key: 'value', children: 'children' }
                    )
                    targetOption.loading = true
                }
                // 不同层级使用不同接口时可参考 getRegionList 方法
                // 可以根据 level 判断当前请求的第几段
                // 例如： switch(level){
                //          case 1:
                //              result = await getList_1().catch(()=>{})
                //              break
                //          case 2:
                //              result = await getList_2().catch(()=>{})
                //              break
                //          ……
                //       }
                result = await getRegionList({
                    parentId: value,
                }).catch(() => {
                    throw new Error('请求失败')
                })
                const { code, data } = result
                if (targetOption) {
                    targetOption.loading = false
                }
                if (CODE_SUCCESS === code) {
                    const list = data.map((item) => ({
                        ...item,
                        isLeaf: level === maxLevel.value,
                    }))
                    // 判断层级
                    if (!targetOption) {
                        // 第一级直接赋值
                        options.value = list
                    } else {
                        // 从第二级开始填写子级
                        targetOption.children = list
                        options.value = [...options.value]
                    }
                    // 回填默认值
                    if (defaultValue && defaultValue.length && level < maxLevel.value) {
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
         * 加载下一级
         */
        async function getChildrenData(selectedOptions) {
            const targetOption = last(selectedOptions)
            await getData(targetOption?.value ?? 0, selectedOptions.length + 1)
        }

        /**
         * 获取地区列表
         * @param {object} params
         */
        function getRegionList(params) {
            return new Promise((resolve) => {
                ;(async () => {
                    // 演示示例
                    const list = {
                        0: [
                            { id: 1, name: '北京' },
                            { id: 2, name: '山东省' },
                        ],
                        1: [{ id: 11, name: '北京市' }],
                        2: [
                            { id: 21, name: '济南市' },
                            { id: 22, name: '菏泽市' },
                            { id: 23, name: '青岛市' },
                        ],
                        11: [
                            { id: 111, name: '东城区' },
                            { id: 112, name: '西城区' },
                            { id: 113, name: '海淀区' },
                            { id: 114, name: '昌平区' },
                            { id: 114, name: '朝阳区' },
                        ],
                        21: [
                            { id: 211, name: '历下区' },
                            { id: 212, name: '市中区' },
                            { id: 213, name: '槐荫区' },
                        ],
                        22: [
                            { id: 221, name: '牡丹区' },
                            { id: 222, name: '定陶区' },
                            { id: 223, name: '郓城县' },
                        ],
                        23: [
                            { id: 231, name: '市南区' },
                            { id: 232, name: '市北区' },
                            { id: 233, name: '黄岛区' },
                        ],
                    }
                    resolve({
                        code: 200,
                        data: mapping({
                            data: list[params.parentId],
                            fieldNames: {
                                label: 'name',
                                value: 'id',
                            },
                        }),
                    })
                })()
            })
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
                selectedOptions.map((item) => pick(item, ['label', 'value']))
            )
            onFieldChange()
        }

        return {
            options,
            onLoadData: getChildrenData,
            onChange,
        }
    },
}
</script>

<style lang="less" scoped></style>
