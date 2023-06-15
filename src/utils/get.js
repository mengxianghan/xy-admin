import { cloneDeep, keys, pick } from 'lodash-es'

/**
 * 获取环境变量
 */
export const getEnvConfig = (name) => (name ? import.meta.env[`VITE_${name}`] : import.meta.env)

/**
 * 获取文件后缀
 */
export const getSuffix = (filename) => filename.split('.').pop().toLowerCase()

/**
 * 获取表单数据
 * 根据表单字段从行数据中获取对应的数据，用于回填表单
 * @param {object} record
 * @param {object} formState
 */
export const getFormState = (record = {}, formState = {}) => pick(cloneDeep(record), keys(formState) || []) || {}

/**
 * 获取静态文件 url
 * @param {string} url
 * @returns
 */
export const getAssetsFile = (url) => {
    return new URL(`../assets/${url}`, import.meta.url).href
}
