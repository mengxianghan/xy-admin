import { Spin } from 'ant-design-vue'
import { createVNode, render } from 'vue'

const INSTANCE_KEY = Symbol('vloading')

const append = (el) => {
    el.style.position = 'relative'
    el.append(el[INSTANCE_KEY])
}

const remove = (el) => {
    el.style.position = ''
    if (el[INSTANCE_KEY]) {
        el[INSTANCE_KEY].remove()
    }
}

const loadingDirective = {
    mounted: (el, binding) => {
        const vm = createVNode(Spin, {
            tip: el.getAttribute('loading-tip'),
        })
        const elContainer = document.createElement('div')
        render(vm, elContainer)
        elContainer.setAttribute(
            'style',
            'position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; z-index: 100; background: rgba(255, 255, 255, .65)'
        )
        el[INSTANCE_KEY] = elContainer
        if (binding?.value) {
            append(el)
        }
    },
    updated: (el, binding) => {
        if (binding?.value !== binding?.oldValue) {
            binding?.value ? append(el) : remove(el)
        }
    },
}

export function setupLoadingDirective(app) {
    app.directive('loading', loadingDirective)

    return app
}

export default loadingDirective
