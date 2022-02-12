import LoadingConstructor from './loading.vue'
import {createVNode, render} from 'vue'

let vm = null

const close = () => {
    if (vm) {
        vm.el.parentNode.parentNode.removeChild(vm.el.parentNode)
        vm = null
    }
}

const Loading = (props) => {
    if (vm) {
        close()
    }
    vm = createVNode(LoadingConstructor, props)
    const container = document.createElement('div')
    render(vm, container)
    document.body.appendChild(container)
    return Loading
}

Loading.close = () => {
    close()
}

export default Loading
