import { createApp } from 'vue'

import LoadingConstructor from './Loading.vue'

let container = null
let app = null

/**
 * 返回
 */
function popstateListener() {
    close()
}

/**
 * 打开
 * @param {object} props
 */
function open(props) {
    Loading.close()
    container = document.createElement('div')
    app = createApp(LoadingConstructor, props)
    app.mount(container)
    document.body.appendChild(container)

    window.addEventListener('popstate', popstateListener)
}

/**
 * 关闭
 */
function close() {
    if (app) {
        app.unmount(container)
    }
    if (container) {
        container.remove()
    }
    container = null
    app = null

    window.removeEventListener('popstate', popstateListener)
}

const Loading = (props) => {
    open(props)
}

Loading.close = close

export default Loading
