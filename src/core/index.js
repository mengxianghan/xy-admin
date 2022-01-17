import antd from 'ant-design-vue'
import icon from '@/plugins/icon'
import component from '@/plugins/component'
import api from '@/api'
import {setupStore} from '@/store'
import {setupRouter} from '@/router'

import './permission'

import 'ant-design-vue/dist/antd.less'
import '@/styles/index.less'

if ('true' === process.env.VUE_APP_MOCK) {
    require('@/mock')
}

export const useCore = (app) => {
    app.use(antd)
    app.use(icon)
    app.use(component)
    app.config.globalProperties.$api = api
    setupStore(app)
    setupRouter(app)
}
