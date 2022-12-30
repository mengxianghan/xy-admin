import Enum from 'xy-enum'

// 状态
export const STATUS_ENUM = new Enum([
    { key: 'wait', value: 1, desc: '等待上传' },
    { key: 'uploading', value: 2, desc: '上传中' },
    { key: 'done', value: 3, desc: '上传完成' },
    { key: 'error', value: 4, desc: '上传错误' },
    { key: 'removed', value: 5, desc: '已移除' },
])
