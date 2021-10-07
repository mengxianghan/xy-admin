import {createApp} from 'vue'
import App from './App.vue'
import {setupRouter} from './router'
import {setupStore} from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

const bootstrap = () => {
    const app = createApp(App)
    setupStore(app)
    setupRouter(app)
    app.use(Antd)
    app.mount('#app')
}

bootstrap()