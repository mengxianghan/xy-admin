import {isUrl} from '@/utils/is'
import {message} from 'ant-design-vue'

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
 * 查找父级节点
 * @param el
 * @param selector
 * @return {HTMLElement}
 */
export function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break
        }
        el = el.parentElement
    }
    return el
}

/**
 * 循环树型数据
 * @param {array }list
 * @param {number} value
 * @param {function} callback
 * @param {object} fields
 */
export function findTree(list, value, callback, fields = {key: 'id', children: 'children'}) {
    list.forEach((item, index, array) => {
        if (item[fields.key] === value) {
            return callback(item, index, array)
        }
        if (item[fields.children]) {
            return findTree(item[fields.children], value, callback, fields)
        }
    })
}

/**
 * 切换树拖拽属性
 * @param event
 */
export function toggleTreeDrag(event) {
    const parent = closest(event.target, '.ant-tree-node-content-wrapper')
    if (parent.classList.contains('draggable')) {
        parent.attributes.removeNamedItem('draggable')
        parent.classList.remove('draggable')
    } else {
        parent.draggable = true
        parent.classList.add('draggable')
    }
}

/**
 * 下载文件
 * @param fileUrl
 * @param fileName
 */
export function downloadFile(fileUrl, fileName) {
    if (!isUrl(fileUrl)) {
        message.warning('非法的下载地址')
        return
    }
    let el = document.createElement('a')
    el.href = fileUrl
    el.target = '_blank'
    if (fileName) el.download = fileName //下载后文件名
    document.body.appendChild(el)
    el.click() //点击下载
    document.body.removeChild(el) //下载完成移除元素
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

/**
 * 数组合并为对象
 * @param {array} keys
 * @param {array} values
 * @param {function | array} format
 * @return {{}}
 */
export function zipObjectPlus(keys = [], values = [], format) {
    const result = {}
    if (Array.isArray(keys) && Array.isArray(values)) {
        keys.forEach((key, index) => {
            const func = Array.isArray(format) ? format[index] : format
            result[key] = Object.prototype.toString.call(func) === '[object Function]' ? func(values[index]) : values[index]
        })
    }
    return result
}


