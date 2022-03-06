<template>
    <a-cascader v-bind="$attrs"
                :value="modelValue"
                :options="options"
                :placeholder="placeholder"
                :load-data="getChildrenData"
                @change="onChange"></a-cascader>
</template>

<script>
import {findTree, mapping} from '@/utils'
import {last, pick} from 'lodash'
import {onMounted, ref, toRefs, watch} from 'vue'
import {message, Form} from 'ant-design-vue'
import {commonApi} from '@/api'

/**
 * 地区联动
 * @property {array} model-value v-model
 * @property {string} placeholder
 */
export default {
    name: 'Region',
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
    setup(props, {emit}) {
        const {modelValue} = toRefs(props)
        const maxLevel = ref(3)
        const options = ref([])
        const currentValue = ref([])
        const {onFieldChange} = Form.useInjectFormItemContext()

        watch(() => modelValue.value, (val) => {
            if (val !== currentValue.value) {
                getData(0, 1, val)
            }
        })

        onMounted(() => {
            currentValue.value = modelValue.value
            getData(0, 1, modelValue.value)
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
                let result = null
                // 从第二级开始查找父级
                if (level > 1) {
                    findTree(
                        options.value,
                        value,
                        (item) => {
                            targetOption = item
                        },
                        {key: 'value', children: 'children'},
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
                const {code, data} = result
                if (targetOption) {
                    targetOption.loading = false
                }
                if ('200' === code) {
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
            return new Promise(async (resolve, reject) => {
                const {code, data} = await commonApi.getRegionList(params).catch(() => {
                    reject()
                })
                if ('200' === code) {
                    const {rows} = data
                    resolve({
                        code,
                        data: mapping(rows, {
                            label: 'name',
                            value: 'id',
                        }),
                    })
                } else {
                    reject()
                }
            })
        }

        /**
         * 发生改变
         */
        function onChange(value, selectedOptions) {
            currentValue.value = value
            emit('update:modelValue', value)
            emit('change', value, selectedOptions.map((item) => pick(item, ['label', 'value'])))
            onFieldChange()
        }

        return {
            options,
            getChildrenData,
            onChange,
        }
    },
}
</script>

<style lang="less"
       scoped>
</style>
