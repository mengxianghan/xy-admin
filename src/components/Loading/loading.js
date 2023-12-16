import LoadingConstructor from './Loading.vue'
import { createVNode, render } from 'vue'
import { getScrollWidth, onPopState, onUnPopState, setStyle } from '../utils'

let container

function show() {
    hide()
    const vm = createVNode(LoadingConstructor, { type: 'fullscreen' })
    container = document.createElement('div')
    render(vm, container)
    setStyle(document.body, {
        paddingRight: `${getScrollWidth()}px`,
        overflow: 'hidden',
    })
    document.body.appendChild(container)
    onPopState(hide)
}

function hide() {
    if (!container) return
    container.remove()
    container = null
    setStyle(document.body, {
        paddingRight: '',
        overflow: '',
    })
    onUnPopState(hide)
}

export default { show, hide }
