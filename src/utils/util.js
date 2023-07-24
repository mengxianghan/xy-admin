import { isMatch, snakeCase, toUpper, cloneDeep, keys, pick } from 'lodash-es'
import dayjs from 'dayjs'

/**
 * 数据映射
 * @param {array} data 数据源
 * @param {object} fieldNames 自定义节点
 * @param {object} expand 拓展数据
 * @param {string} treeFieldName 子节点，如果是树型结构，传入树型结构的子节点对应的字典名
 * @param {boolean} keepOtherFields 保留其他字段
 * @returns {array}
 */
export const mapping = ({ data, fieldNames = {}, expand = {}, treeFieldName, keepOtherFields = false }) => {
    let result = []
    if (!Array.isArray(data)) return []
    if (!fieldNames) return data
    data.forEach((item, index, array) => {
        let temp = keepOtherFields ? { ...item } : {},
            record,
            filedValue

        if (treeFieldName) {
            delete temp[treeFieldName]
        }
        for (let filedKey in fieldNames) {
            filedValue = fieldNames[filedKey]
            record = item[filedValue]

            if (filedValue === treeFieldName) {
                // 树结构
                if (record && record.length) {
                    const child = mapping({
                        data: item[treeFieldName],
                        fieldNames,
                        expand,
                        treeFieldName,
                        keepOtherFields,
                    })

                    if (child && child.length) {
                        temp[filedKey] = child
                    }
                }
            } else if (filedValue instanceof Function) {
                // 函数
                temp[filedKey] = filedValue(item, index, array)
            } else {
                temp[filedKey] = typeof record !== 'undefined' && record !== '' ? record : ''
            }
        }
        temp = expand ? { ...temp, ...expand } : temp
        result.push(temp)
    })
    return result
}

/**
 * 从树型结构中查找对应数据
 * @param {array } data
 * @param {string | object} value
 * @param {function} callback
 * @param {object} fieldNames
 * @param {array} path
 */
export const findTree = (data, value, callback, fieldNames = { key: 'id', children: 'children' }, path = []) => {
    data.forEach((item, index, array) => {
        if (isObject(value) ? isMatch(item, value) : item[fieldNames.key] === value) {
            return callback(item, index, array, [...path, item])
        }
        if (item[fieldNames.children]) {
            return findTree(item[fieldNames.children], value, callback, fieldNames, [...path, item])
        }
    })
}

/**
 * 数组最深层级
 * 查找一个树型结构最多有几级
 * @param data
 * @param fieldNames
 * @return {number}
 */
export const deep = (data, fieldNames = { children: 'children' }) => {
    let result = 1
    data.forEach((item) => {
        const child = item[fieldNames.children] || []
        if (child.length) {
            let temp = deep(child, fieldNames) + 1
            result = temp > result ? temp : result
        }
    })
    return result
}

/**
 * 深度合并
 * @param object
 * @param sources
 * @return {*}
 */
export const deepMerge = (object, sources) => {
    let key
    for (key in sources) {
        object[key] =
            object[key] && object[key].toString() === '[object Object]'
                ? deepMerge(object[key], sources[key])
                : (object[key] = sources[key])
    }
    return object
}

/**
 * 时间段前缀
 * @returns
 */
export const timeFix = () => {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * 数组合并为对象
 * @param {array} keys
 * @param {array} values
 * @param {function | array} funcs
 * @return {{}}
 */
export const zipObjectPlus = (keys = [], values = [], funcs) => {
    const result = {}
    if (Array.isArray(keys) && Array.isArray(values)) {
        keys.forEach((key, index) => {
            const func = Array.isArray(funcs) ? funcs[index] : funcs
            result[key] =
                Object.prototype.toString.call(func) === '[object Function]' ? func(values[index]) : values[index]
        })
    }
    return result
}

/**
 * 获取环境变量
 * @param {string} key
 * @returns
 */
export const env = (key, def = null) => {
    const value = import.meta.env[`VITE_${toUpper(snakeCase(key))}`] || def
    if (['true', 'false'].includes(value)) {
        return Boolean(value)
    }
    return value
}

/**
 * 树形结构转线形结构
 * @param {array} data
 * @param {object} fieldNames
 * @return {*[]}
 */
export const toList = (data = [], fieldNames = { children: 'children' }) => {
    let result = []
    if (!Array.isArray(data)) return result
    data.forEach((item) => {
        let temp = []
        result.push(item)
        if (item[fieldNames.children] && item[fieldNames.children].length) {
            let children = toList(item[fieldNames.children], fieldNames)
            if (children.length) {
                temp = children
            }
        }
        result.push(...temp)
    })
    return result
}

/**
 * 线形数据转树形数据
 * @param {array} data
 * @param {string | number} parentValue
 * @param {object} fieldNames
 * @return {*[]}
 */
export const toTree = (
    data = [],
    parentValue = '0',
    fieldNames = {
        key: 'id',
        children: 'children',
        parentKey: 'parentId',
    }
) => {
    const result = []
    data.forEach((item) => {
        if (item[fieldNames.parentKey] === parentValue) {
            let temp = item
            let children = toTree(data, item[fieldNames.key])
            if (children.length) {
                temp[fieldNames.children] = children
            }
            result.push(temp)
        }
    })
    return result
}

/**
 * 格式化日期
 * @param datetime {Date} 日期
 * @param def {*} 默认值
 * @return {string}
 */
export const formatDatetime = (datetime, def = null) => (datetime ? dayjs(datetime).format('YYYY-MM-DD HH:mm:ss') : def)

/**
 * 格式化一天的开始时间
 * @param datetime
 * @param def
 * @return {string}
 */
export const formatStartTimeOfDay = (datetime, def = null) =>
    datetime ? dayjs(datetime).startOf('day').format('YYYY-MM-DD HH:mm:ss') : def

/**
 * 格式化一天的结束时间
 * @param datetime
 * @param def
 * @return {string}
 */
export const formatEndTimeOfDay = (datetime, def = null) =>
    datetime ? dayjs(datetime).endOf('day').format('YYYY-MM-DD HH:mm:ss') : def

/**
 * 格式化字段，无数据是返回自定义空值
 * @param data
 * @param def
 * @returns {string}
 */
export const formatField = (data, def = '-') => data ?? def

/**
 * 格式化时间区间
 * @param {array} keys
 * @param {array} values
 * @return {{}}
 */
export const formatRangeTime = (keys, values) => zipObjectPlus(keys, values, [formatStartTimeOfDay, formatEndTimeOfDay])

/**
 * 获取环境变量
 */
export const getEnvConfig = (name) => (name ? import.meta.env[`VITE_${name}`] : import.meta.env)

/**
 * 获取文件后缀
 */
export const getSuffix = (filename) => filename.split('.').pop().toLowerCase()

/**
 * 获取表单数据
 * 根据表单字段从行数据中获取对应的数据，用于回填表单
 * @param {object} record
 * @param {object} formState
 */
export const getFormState = (record = {}, formState = {}) => pick(cloneDeep(record), keys(formState) || []) || {}

/**
 * 获取静态文件 url
 * @param {string} url
 * @returns
 */
export const assets = (url) => {
    return new URL(`../assets/${url}`, import.meta.url).href
}

/**
 * 是否 url
 * @param {string} value
 */
export const isUrl = (value) => new RegExp('^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+', 'g').test(value)

/**
 * 是否 object
 */
export const isObject = (value) => '[object Object]' === Object.prototype.toString.call(value)
