import Enum from 'xy-enum'

export const DIRECTION_LEFT = 'left'
export const DIRECTION_RIGHT = 'right'
export const DIRECTION_TOP = 'top'
export const DIRECTION_BOTTOM = 'bottom'

// 方向
export const directionEnum = new Enum([
    { key: 'top', value: 'top', desc: '上' },
    { key: 'bottom', value: 'bottom', desc: '下' },
    { key: 'left', value: 'left', desc: '左' },
    { key: 'right', value: 'right', desc: '右' },
])
