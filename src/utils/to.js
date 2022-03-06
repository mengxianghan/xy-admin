/**
 * 树形结构转线形结构
 * @param {array} list
 * @param {object} fields
 * @return {*[]}
 */
export function toList(list = [], fields = {children: 'children'}) {
    let result = []
    if (!Array.isArray(list)) return result
    list.forEach(item => {
        let temp = []
        result.push(item)
        if (item[fields.children] && item[fields.children].length) {
            let children = toList(item[fields.children], fields)
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
 * @param {array} list
 * @param {string | number} parentValue
 * @param {object} fields
 * @return {*[]}
 */
export function toTree(list = [], parentValue = '0', fields = {
    key: 'id',
    children: 'children',
    parentKey: 'parentId',
}) {
    const result = []
    list.forEach(item => {
        if (item[fields.parentKey] === parentValue) {
            let temp = item
            let children = toTree(list, item[fields.key])
            if (children.length) {
                temp[fields.children] = children
            }
            result.push(temp)
        }
    })
    return result
}
