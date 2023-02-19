import { createVNode, render } from 'vue'

import LoadingConstructor from './Loading.vue'

let container = null

function show(props) {
    if (container) Loading.hide()
    container = document.createElement('div')
    const vnode = createVNode(LoadingConstructor, props)
    render(vnode, container)
    document.body.appendChild(container)
}

const Loading = (props) => {
    show(props)
}

Loading.hide = () => {
    if (!container) return
    document.body.removeChild(container)
    container = null
}

Loading.error = () => {
    show({
        status: 'error',
    })
}

export default Loading
