import { createVNode, render } from 'vue'

import LoadingConstructor from './Loading.vue'

let container = null

function show(el) {
    hide(el)
    container = document.createElement('div')
    const props = {
        type: 'directive',
    }
    const text = el.getAttribute('x-loading-text')
    if (text) {
        props.text = text
    }
    const vnode = createVNode(LoadingConstructor, props)
    render(vnode, container)
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    el.appendChild(container)
}

function hide(el) {
    if (!container) return
    container.remove()
    container = null
    el.style.position = ''
    el.style.overflow = ''
}

const loadingDirective = {
    mounted: (el, binding) => {
        if (!binding?.value) return
        show(el)
    },
    updated: (el, binding) => {
        if (binding?.value === binding?.oldValue) return
        binding?.value ? show(el) : hide(el)
    },
    beforeUnmount: (el) => {
        hide(el)
    },
}

export const setupLoadingDirective = (app) => {
    app.directive('loading', loadingDirective)
    return app
}
