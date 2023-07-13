import { createApp } from 'vue'

import PreviewConstructor from './Preview.vue'

let container = null
let app = null
let vm = null

/**
 * 返回
 */
function popstateListener() {
    close()
}

function open(payload, index) {
    close()
    let props = {
        index: typeof index === 'number' ? index : 0,
    }
    container = document.createElement('div')
    if (typeof payload === 'string') {
        props.urls = [payload]
    }
    if (Array.isArray(payload)) {
        props.urls = payload
    }
    if (Object.prototype.toString.call(payload) === '[object Object]') {
        props = payload
    }
    app = createApp(PreviewConstructor, {
        ...props,
        afterClose: close,
    })
    vm = app.mount(container)
    document.body.appendChild(container)
    vm.open = true
    window.addEventListener('popstate', popstateListener)
}

function close() {
    if (app) {
        app.unmount()
        vm.open = false
    }
    if (container) {
        container.remove()
    }
    container = null
    app = null
    vm = null

    window.removeEventListener('popstate', popstateListener)
}

const Preview = open

Preview.close = close

export default Preview
