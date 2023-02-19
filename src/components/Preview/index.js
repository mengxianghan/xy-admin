import { createVNode, render } from 'vue'

import PreviewConstructor from './Preview.vue'

let vnode = null

const Preview = (props = {}) => {
    vnode = createVNode(PreviewConstructor, props)
    const container = document.createElement('div')
    render(vnode, container)
    vnode.component?.exposed?.open()
    return Preview
}

Preview.close = () => {
    if (!vnode) return
    vnode.component.exposed?.close()
    vnode = null
}

export default Preview
