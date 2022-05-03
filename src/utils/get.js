import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import keys from 'lodash/keys'

/**
 * 获取文件后缀
 */
export function getSuffix(filename) {
    return filename.split('.')
                   .pop()
                   .toLowerCase()
}

/**
 * 获取表单数据
 * 根据表单字段从行数据中获取对应的数据，用于回填表单
 * @param {object} record
 * @param {object} formState
 */
export function getFormState(record = {}, formState = {}) {
    return pick(cloneDeep(record), keys(formState) || []) || {}
}
