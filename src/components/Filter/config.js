import Enum from 'xy-enum'

export const TYPE_ENUM = new Enum([
    {key: 'tag', value: 'tag', desc: '标签'},
    {key: 'input', value: 'input', desc: '输入框'},
    {key: 'inputRange', value: 'inputRange', desc: '区间输入框'},
    {key: 'date', value: 'date', desc: '日期输入框'},
    {key: 'dateRange', value: 'dateRange', desc: '日期区间'},
])
