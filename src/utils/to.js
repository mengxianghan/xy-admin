/**
 * 树形结构转线形结构
 * @param {array} data
 * @param {object} fieldNames
 * @return {*[]}
 */
export const tree2list = (data = [], fieldNames = { children: 'children' }) => {
    let result = []
    if (!Array.isArray(data)) return result
    data.forEach((item) => {
        let temp = []
        result.push(item)
        if (item[fieldNames.children] && item[fieldNames.children].length) {
            let children = tree2list(item[fieldNames.children], fieldNames)
            if (children.length) {
                temp = children
            }
        }
        result = [...result, ...temp]
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
export const list2tree = (
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
            let children = list2tree(data, item[fieldNames.key])
            if (children.length) {
                temp[fieldNames.children] = children
            }
            result.push(temp)
        }
    })
    return result
}
