import Main from './main.vue'
import {createVNode, render} from 'vue'

let instance = null

const close = () => {
    if (instance) {
        instance = null
    }
}

const Preview = (props) => {
    instance = createVNode(Main, props)
    console.log(instance.visible)
    return Preview
}

Preview.close = () => {
    close()
}

export default Preview
