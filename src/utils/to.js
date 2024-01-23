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
 * 转布尔
 */
export const toBoolean = (value) => {
    if (value === 'true' || value === true) return true
    if (value === 'false' || value === false) return false
}
