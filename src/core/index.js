import antd from 'ant-design-vue'
import component from '@/components'
import icon from '@/components/icon'
import {setupStore} from '@/store'
import {setupRouter} from '@/router'
import {setupActionDirective} from '@/directives/action'
import {setupLoadingDirective} from '@/directives/loading'

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
    setupStore(app)
    setupRouter(app)
    setupActionDirective(app)
    setupLoadingDirective(app)
}
