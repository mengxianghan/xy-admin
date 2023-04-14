import { createVNode, render } from 'vue'

import LoadingConstructor from './Loading.vue'

function show(el) {
    hide(el)
    const container = document.createElement('div')
    const props = {
        type: 'directive',
    }
    const title = el.getAttribute('x-loading-title')
    if (title) {
        props.title = title
    }
    const vnode = createVNode(LoadingConstructor, props)
    render(vnode, container)
    container.classList.add('x-loading-container')
    el.classList.add('x-loading-wrap')
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    el.appendChild(container)
}

function hide(el) {
    el.classList.remove('x-loading-wrap')
    el.querySelector('.x-loading-container')?.remove()
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
