import moment from 'moment'
import {zipObjectPlus} from '@/utils/index'

/**
 * 格式化日期
 * @param datetime
 * @return {string}
 */
export function formatDatetime(datetime, def = null) {
    return datetime ? moment(datetime).format('YYYY-MM-DD HH:mm:ss') : def
}

/**
 * 格式化一天的开始时间
 * @param datetime
 * @return {string}
 */
export function formatStartTimeOfDay(datetime, def = null) {
    return datetime ? moment(datetime).startOf('day').format('YYYY-MM-DD HH:mm:ss') : def
}

/**
 * 格式化一天的结束时间
 * @param datetime
 * @return {string}
 */
export function formatEndTimeOfDay(datetime, def = null) {
    return datetime ? moment(datetime).endOf('day').format('YYYY-MM-DD HH:mm:ss') : def
}

/**
 * 格式化字段，无数据是返回自定义空值
 * @param data
 * @param def
 * @returns {string}
 */
export function formatField(data, def = '-') {
    return data ?? def
}

/**
 * 格式化时间区间
 * @param {array} keys
 * @param {array} values
 * @param {array | function} format
 * @return {{}}
 */
export function formatRangeTime(keys, values, format = [formatStartTimeOfDay, formatEndTimeOfDay]) {
    return zipObjectPlus(keys, values, format)
}
