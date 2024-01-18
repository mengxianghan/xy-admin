import XYEnum from 'xy-enum'

export const DIRECTION_ENUM = new XYEnum([
    { key: 'left', value: 'left', desc: '左侧' },
    { key: 'right', value: 'right', desc: '右侧' },
])

export const TRANSFER_KEY = Symbol('transfer')

export const TRANSFER_LIST_KEY = Symbol('transfer_list')
