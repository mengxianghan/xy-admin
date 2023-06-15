import dayjs from 'dayjs'

import { zipObjectPlus } from '@/utils/index'

/**
 * 格式化日期
 * @param datetime {Date} 日期
 * @param def {*} 默认值
 * @return {string}
 */
export const formatDatetime = (datetime, def = null) => (datetime ? dayjs(datetime).format('YYYY-MM-DD HH:mm:ss') : def)

/**
 * 格式化一天的开始时间
 * @param datetime
 * @param def
 * @return {string}
 */
export const formatStartTimeOfDay = (datetime, def = null) =>
    datetime ? dayjs(datetime).startOf('day').format('YYYY-MM-DD HH:mm:ss') : def

/**
 * 格式化一天的结束时间
 * @param datetime
 * @param def
 * @return {string}
 */
export const formatEndTimeOfDay = (datetime, def = null) =>
    datetime ? dayjs(datetime).endOf('day').format('YYYY-MM-DD HH:mm:ss') : def

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
export const formatRangeTime = (keys, values) => zipObjectPlus(keys, values, [formatStartTimeOfDay, formatEndTimeOfDay])
