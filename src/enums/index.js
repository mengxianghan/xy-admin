import Enum from 'xy-enum'

// 状态
export const STATUS_ENUM = new Enum([
    {key: 'enabled', value: 1, desc: '启用'},
    {key: 'disabled', value: 0, desc: '禁用'}
])