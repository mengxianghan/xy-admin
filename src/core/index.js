import { setupException } from './exception'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupActionDirective } from '@/directives/action'
import { setupMock } from '@/mock'

import antd from 'ant-design-vue'
import component from '@/components'
import icon from '@/components/icon'

import './permission'

import 'ant-design-vue/dist/antd.less'
import '@/styles/index.less'

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
