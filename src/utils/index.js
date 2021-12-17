/**
 * 数据映射
 * @param {array} list 数据源
 * @param {object} structure 新结构
 *          {
 *              新字段名称: 对应数据中的字段名 || function(item, index, array){}
 *          }
 * @param {object} expand 拓展数据
 * @param {string} treeField 子节点，如果是树型结构，传入树型结构的子节点对应的字典名
 * @returns {[]}
 */
export function mapping(list, structure = {}, expand = {}, treeField) {
    let result = []
    if (!Array.isArray(list)) return []
    if (!structure) return list
    list.forEach((item, index, array) => {
        let temp = {},
            record,
            structureValue
        for (let key in structure) {
            structureValue = structure[key]
            record = item[structureValue]
            if (structureValue === treeField) {
                // 树结构
                if (record && record.length) {
                    const child = mapping(item[treeField], structure, expand, treeField)
                    if (child && child.length) {
                        temp[key] = child
                    }
                }
            } else if (structureValue instanceof Function) {
                // 函数
                temp[key] = structureValue(item, index, array)
            } else {
                temp[key] = (typeof record !== 'undefined') && record !== '' ? record : ''
            }
        }
        temp = expand ? {...temp, ...expand} : temp
        result.push(temp)
    })
    return result
}

/**
 * 循环树型数据
 * @param {array }list
 * @param {string} value
 * @param {function} callback
 * @param {object} fields
 */
export function loopTreeData(list, value, callback, fields = {key: 'id', children: 'children'}) {
    list.forEach((item, index, array) => {
        if (item[fields.key] === value) {
            return callback(item, index, array)
        }
        if (item[fields.children]) {
            return loopTreeData(item[fields.children], value, callback)
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
export function deep(list, fields = {children: 'children'}) {
    let result = 1
    list.forEach(item => {
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
export function mergeDeep(object, sources) {
    let key
    for (key in sources) {
        object[key] =
            object[key] && object[key].toString() === '[object Object]'
                ? mergeDeep(object[key], sources[key])
                : (object[key] = sources[key])
    }
    return object
}
