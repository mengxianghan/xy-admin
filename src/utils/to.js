/**
 * 树形结构转线形结构
 * @param {Array} data
 * @param {object} fieldNames
 * @return {*[]}
 */
export function tree2list(data = [], fieldNames = { children: 'children' }) {
  const result = []
  if (!Array.isArray(data))
    return result
  data.forEach((item) => {
    let temp = []
    result.push(item)
    if (item[fieldNames.children] && item[fieldNames.children].length) {
      const children = tree2list(item[fieldNames.children], fieldNames)
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
 * @param {Array} data
 * @param {string | number} parentValue
 * @param {object} fieldNames
 * @return {*[]}
 */
export function list2tree(data = [], parentValue = '0', fieldNames = {
  key: 'id',
  children: 'children',
  parentKey: 'parentId',
}) {
  const result = []
  data.forEach((item) => {
    if (item[fieldNames.parentKey] === parentValue) {
      const temp = item
      const children = list2tree(data, item[fieldNames.key])
      if (children.length) {
        temp[fieldNames.children] = children
      }
      result.push(temp)
    }
  })
  return result
}

/**
 * 转布尔
 */
export function string2boolean(value) {
  if (value === 'true' || value === true)
    return true
  if (value === 'false' || value === false)
    return false
}
