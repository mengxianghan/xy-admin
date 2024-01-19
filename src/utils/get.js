import { cloneDeep, keys, pick } from 'lodash-es'

/**
 * 获取表单数据
 * 根据表单字段从行数据中获取对应的数据，用于回填表单
 * @param {object} record
 * @param {object} formData
 */
export const getFormData = (record = {}, formData = {}) => pick(cloneDeep(record), keys(formData) || []) || {}

/**
 * 获取变量类型
 * @param {*} value
 * @returns
 */
export const getType = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase()

/**
 * 获取文件后缀
 * @param {*} filename
 * @returns
 */
export const getSuffix = (filename) => filename.split('.').pop().toLowerCase()
