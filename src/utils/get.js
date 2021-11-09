import {cloneDeep, pick} from 'lodash'

/**
 * 获取文件后缀
 */
export function getSuffix(filename) {
    return filename.split('.').pop().toLowerCase()
}

/**
 * 获取表单数据
 * 根据表单字段从行数据中获取对应的数据，用于回填表单
 * @param record
 * @param form
 * @return {Pick<{}, never>}
 */
export function getFormData(record = {}, form = {}) {
    return pick(cloneDeep(record), form?.fields.map(item => item.prop) || []) || {}
}
