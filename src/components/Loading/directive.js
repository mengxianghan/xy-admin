import { createVNode, render } from 'vue'
import LoadingConstructor from './Loading.vue'
import { setStyle } from '@/components/utils'

function show(el, binding) {
    if (!binding.value) return
    const vm = createVNode(LoadingConstructor, { type: 'directive' })
    const container = document.createElement('div')
    if (!el.style.position) {
        setStyle(el, {
            position: 'relative',
        })
    }
    render(vm, container)
    el.hide = () => {
        container.remove()
    }
    el.appendChild(container)
}

function hide(el) {
    el?.hide?.()
}

export default {
    name: 'loading',
    mounted: (el, binding) => {
        show(el, binding)
    },
    updated: (el, binding) => {
        if (binding.value === binding.oldValue) return
        binding.value ? show(el, binding) : hide(el, binding)
    },
    unmounted: (el, binding) => {
        hide(el, binding)
    },
}
