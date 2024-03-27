import { reactive } from 'vue'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

export default () => {
    dayjs.extend(quarterOfYear)

    const rangeDate = reactive({})

    /**
     * 时间发生改变
     * @param {date} dates
     * @param {string} fieldName
     */
    function onCalendarChange(dates, fieldName = '') {
        if (!fieldName) return
        rangeDate[fieldName] = dates
    }

    /**
     * 禁用时间
     * @param {Date} currentDate
     * @param {string} fieldName
     * @param {number} [duration] 时长，默认：3
     * @param {('millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date' | 'milliseconds' | 'seconds' | 'minutes')} [unit] 单位，默认：月
     */
    function disableDate(currentDate, fieldName = '', duration = 3, unit = 'month') {
        if (!rangeDate[fieldName] || rangeDate[fieldName]?.length === 0) {
            return false
        }
        const tooLate = rangeDate[fieldName][0] && dayjs(currentDate).diff(rangeDate[fieldName][0], unit) > duration - 1
        const tooEarly =
            rangeDate[fieldName][1] && dayjs(rangeDate[fieldName][1]).diff(currentDate, unit) > duration - 1
        return tooEarly || tooLate
    }

    /**
     * 禁用今天之后的日期
     */
    function disableDateAfterToday(current) {
        return current && current > dayjs().endOf('day')
    }

    return {
        onCalendarChange,
        disableDate,
        disableDateAfterToday,
    }
}
