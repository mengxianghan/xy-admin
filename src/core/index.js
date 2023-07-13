import antd from 'ant-design-vue'
import component from '@/components'
import icon from '@/components/icon'

import { setupActionDirective } from '@/directives/action'
import { setupMock } from '@/mock'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupException } from './exception'

import './permission'

import 'ant-design-vue/dist/reset.css'
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
