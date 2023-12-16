import dayjs from 'dayjs'
import { zipObject } from './index'

/**
 * 格式化日期
 * @param dateTime {Date} 日期
 * @param def {*} 默认值
 * @return {string}
 */
export const formatDateTime = (dateTime, def = null) => (dateTime ? dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss') : def)

/**
 * 格式化一天的开始时间
 * @param dateTime
 * @param def
 * @return {string}
 */
export const formatStartTimeOfDay = (dateTime, def = null) =>
    dateTime ? dayjs(dateTime).startOf('day').format('YYYY-MM-DD HH:mm:ss') : def

/**
 * 格式化一天的结束时间
 * @param dateTime
 * @param def
 * @return {string}
 */
export const formatEndTimeOfDay = (dateTime, def = null) =>
    dateTime ? dayjs(dateTime).endOf('day').format('YYYY-MM-DD HH:mm:ss') : def

/**
 * 格式化字段，无数据是返回自定义空值
 * @param data
 * @param def
 * @returns {string}
 */
export const formatField = (data, def = '-') => data ?? def

/**
 * 格式化时间区间
 * @param {array} keys
 * @param {array} values
 * @return {{}}
 */
export const formatRangeTime = (keys, values) => zipObject(keys, values, [formatStartTimeOfDay, formatEndTimeOfDay])
