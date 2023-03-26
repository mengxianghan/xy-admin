import { isMatch, isObject } from 'lodash-es'

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
 * @param {array } list
 * @param {string | object} value
 * @param {function} callback
 * @param {object} fields
 */
export const findTree = (list, value, callback, fields = { key: 'id', children: 'children' }, path = []) => {
    list.forEach((item, index, array) => {
        if (isObject(value) ? isMatch(item, value) : item[fields.key] === value) {
            return callback(item, index, array, [...path, item])
        }
        if (item[fields.children]) {
            return findTree(item[fields.children], value, callback, fields, [...path, item])
        }
    })
}

/**
 * 数组最深层级
 * 查找一个树型结构最多有几级
 * @param list
 * @param fields
 * @return {number}
 */
export const deep = (list, fields = { children: 'children' }) => {
    let result = 1
    list.forEach((item) => {
        const child = item[fields.children] || []
        if (child.length) {
            let temp = deep(child, fields) + 1
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
