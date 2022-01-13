import antd from 'ant-design-vue'
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
    setupStore(app)
    setupRouter(app)
}
