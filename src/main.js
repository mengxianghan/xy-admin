import {createApp} from 'vue'
import {setupRouter} from '@/router'
import {setupStore} from '@/store'

import App from '@/App.vue'
import antd from 'ant-design-vue'
import Component from '@/components'
import '@/core/permission'

import 'ant-design-vue/dist/antd.less'
import '@/assets/styles/index.less'

if ('true' === process.env.VUE_APP_MOCK) {
    require('@/mock')
}

const bootstrap = () => {
    const app = createApp(App)
    app.use(antd)
    app.use(Component)
    setupStore(app)
    setupRouter(app)
    app.mount('#app')
}

bootstrap()
