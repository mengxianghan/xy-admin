import { config } from '@/config'

/**
 * url
 * @param {string} value
 */
export const isUrl = (value) => config('regexp.email').test(value)

/**
 * object
 */
export const isObject = (value) => '[object Object]' === Object.prototype.toString.call(value)
