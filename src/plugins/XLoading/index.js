import XLoadingConstructor from './XLoading.vue'
import {createVNode, render} from 'vue'

const vm = createVNode(XLoadingConstructor)
const container = document.createElement('div')
render(vm, container)
document.body.appendChild(container)

export const XLoading = {
    show(content) {
        return vm.component.ctx.show(content)
    },
    hide() {
        return vm.component.ctx.hide()
    }
}
