import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import component from '@/components'
import icon from '@/components/icon'
import { setupActionDirective } from '@/directives/action'
import { setupMock } from '@/mock'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@/styles/index.less'

import { setupException } from './exception'
import './permission'

if ('true' === import.meta.env.VITE_MOCK) {
    setupMock()
}

export const useCore = (app) => {
    app.use(antd)
    app.use(icon)
    app.use(component)
    setupException(app)
    setupStore(app)
    setupRouter(app)
    setupActionDirective(app)
}
