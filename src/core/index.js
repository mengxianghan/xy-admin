import antd from 'ant-design-vue'
import component from '@/components'

import { setupActionDirective } from '@/directives/action'
import { setupMock } from '@/mock'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupException } from './exception'
import { config } from '@/config'

import './permission'

import 'ant-design-vue/dist/reset.css'
import '@/styles/index.less'

if (config('app.mock')) {
    setupMock()
}

export const useCore = (app) => {
    app.use(antd)
    app.use(component)
    setupException(app)
    setupStore(app)
    setupRouter(app)
    setupActionDirective(app)
}
