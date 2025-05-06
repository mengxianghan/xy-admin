import { get, isMatch } from 'lodash-es'
import { isObject } from './is'

/**
 * 数据映射
 * @param {object} params
 * @param {Array} params.data - 数据源
 * @param {object} params.fieldNames - 自定义节点
 * @param {object} params.expand - 拓展数据
 * @param {string} params.treeFieldName - 子节点，如果是树型结构，传入树型结构的子节点对应的字典名
 * @param {boolean} params.keepOtherFields - 保留其他字段
 * @param {Function} params.filter - 筛选函数
 * @param {Array} params.path
 * @returns {Array}
 */
export function mapping({ data = [], fieldNames = {}, expand = {}, treeFieldName = '', keepOtherFields = false, filter = () => true }, path = []) {
  const result = []
  if (!Array.isArray(data))
    return []
  if (!fieldNames)
    return data
  data.filter((item, index, array) => filter(item, index, array, path)).forEach((item, index, array) => {
    let temp = keepOtherFields ? { ...item } : {}
    let record
    let filedValue

    if (treeFieldName) {
      delete temp[treeFieldName]
    }
    for (const filedKey in fieldNames) {
      filedValue = fieldNames[filedKey]
      record = get(item, filedValue) // item[filedValue]

      if (filedValue === treeFieldName) {
        // 树结构
        if (record && record.length) {
          const child = mapping(
            {
              data: item[treeFieldName],
              fieldNames,
              expand,
              treeFieldName,
              keepOtherFields,
              filter,
            },
            [...path, item],
          )

          if (child && child.length) {
            temp[filedKey] = child
          }
        }
      }
      else if (filedValue instanceof Function) {
        // 函数
        temp[filedKey] = filedValue(item, index, array, [...path, item])
      }
      else {
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
 * @param {Array} data
 * @param {string | object} value
 * @param {Function} callback
 * @param {object} fieldNames
 * @param {Array} path
 */
export function findTree(data, value, callback, fieldNames = { key: 'id', children: 'children' }, path = []) {
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
export function deep(data, fieldNames = { children: 'children' }) {
  let result = 1
  data.forEach((item) => {
    const child = item[fieldNames.children] || []
    if (child.length) {
      const temp = deep(child, fieldNames) + 1
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
export function deepMerge(object, sources) {
  let key
  for (key in sources) {
    object[key]
            = object[key] && object[key].toString() === '[object Object]'
        ? deepMerge(object[key], sources[key])
        : (object[key] = sources[key])
  }
  return object
}

/**
 * 时间段前缀
 * @returns
 */
export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * 数组合并为对象
 * @param {Array} keys
 * @param {Array} values
 * @param {Function | Array} funcs
 * @return {{}}
 */
export function zipObject(keys = [], values = [], funcs) {
  const result = {}
  if (Array.isArray(keys) && Array.isArray(values)) {
    keys.forEach((key, index) => {
      const func = Array.isArray(funcs) ? funcs[index] : funcs
      result[key]
                = Object.prototype.toString.call(func) === '[object Function]' ? func(values[index]) : values[index]
    })
  }
  return result
}

/**
 * 获取静态文件 url
 * @param {string} url
 * @returns
 */
export function assets(url) {
  return new URL(`../assets/${url}`, import.meta.url).href
}

/**
 * 筛选节点
 * @param {object} node - 树节点
 * @param {Function} condition - 筛选函数
 * @param {boolean} keepChildNodes - 保留子节点
 * @returns {(*&{children: *})|*|null}
 */
function filterTreeNode(node, condition, keepChildNodes) {
  // 如果当前节点符合条件，则将其加入结果中
  if (condition(node)) {
    // 创建一个副本，以防修改原始数据
    const result = { ...node }
    // 递归处理子节点
    if (result.children && !keepChildNodes) {
      result.children = filterTree(result.children, condition, keepChildNodes)
    }
    return result
  }
  else {
    // 如果当前节点不符合条件，则检查其子节点
    if (node.children) {
      // 递归处理子节点
      const filteredChildren = filterTree(node.children, condition, keepChildNodes)
      // 如果子节点中有符合条件的节点，则创建一个副本并返回
      if (filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        }
      }
      else {
        // 如果子节点中没有符合条件的节点，则返回空
        return null
      }
    }
    else {
      // 如果当前节点没有子节点且不符合条件，则返回空
      return null
    }
  }
}

/**
 * 筛选树
 * @param {Array} treeData - 数据源
 * @param {Function} condition - 筛选函数
 * @param {boolean} keepChildNodes - 保留子节点
 * @returns {*}
 */
export function filterTree(treeData, condition, keepChildNodes = true) {
  return treeData.map(node => filterTreeNode(node, condition, keepChildNodes)).filter(Boolean)
}
