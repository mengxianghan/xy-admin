import { getType } from './get'

/**
 * 检查是否 url
 * @param {*} value
 * @returns
 */
export const isUrl = (value) => new RegExp('^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+', 'g').test(value)

/**
 * 检查是否 Object
 * @param {*} value
 * @returns
 */
export const isObject = (value) => getType(value) === 'object'

/**
 * 检查是否 Function
 * @param {*} value
 * @returns
 */
export const isFunction = (value) => getType(value) === 'function'

/**
 * 检查是否 AsyncFunction
 * @param {*} value
 * @returns
 */
export const isAsyncFunction = (value) => getType(value) === 'asyncfunction'

/**
 * 检查是否是空内容
 * @param {*} value
 * @returns
 */
export const isEmpty = (value) => value !== '' && value !== null && value !== undefined

/**
 * 检查是否是字符串
 * @param value
 * @returns {boolean}
 */
export const isString = (value) => getType(value) === 'string' || value === undefined
