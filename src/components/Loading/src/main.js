import Vue from 'vue'
import Main from './main.vue'

const LoadingConstructor = Vue.extend(Main)
let instance = null

function close() {
    if (instance.$el && instance.$el.parentNode) {
        instance.$el.parentNode.removeChild(instance.$el)
    }
    instance.visible = false
}

LoadingConstructor.prototype.close = function () {
    close()
}

const Loading = (options) => {
    if (instance) {
        close()
    }
    instance = new LoadingConstructor({
        data: options
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.visible = true
    return instance
}

Loading.close = function () {
    close()
}

export default Loading