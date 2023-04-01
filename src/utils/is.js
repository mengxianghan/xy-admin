import { RE_EMAIL } from '@/config/regexp'

/**
 * url
 * @param {string} value
 */
export const isUrl = (value) => RE_EMAIL.test(value)

/**
 * object
 */
export const isObject = (value) => '[object Object]' === Object.prototype.toString.call(value)
