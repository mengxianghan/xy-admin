import Enum from 'xy-enum'

export const ACTION_ENUM = new Enum([
    { label: 'zoomOut', value: 'zoomOut', desc: '缩小' },
    { label: 'zoomIn', value: 'zoomIn', desc: '放大' },
    { label: 'fullscreen', value: 'fullscreen', desc: '全屏' },
    { label: 'rotateLeft', value: 'rotateLeft', desc: '向左旋转' },
    { label: 'rotateRight', value: 'rotateRight', desc: '向右旋转' },
    { label: 'prev', value: 'prev', desc: '上一个' },
    { label: 'next', value: 'next', desc: '下一个' },
])
