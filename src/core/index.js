import antd from 'ant-design-vue'
import component from '@/components'

import { setupActionDirective } from '@/directives/action'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupException } from './exception'

import './permission'

import 'ant-design-vue/dist/reset.css'
import '@/styles/index.less'

export const useCore = (app) => {
    app.use(antd)
    app.use(component)
    setupException(app)
    setupStore(app)
    setupRouter(app)
    setupActionDirective(app)
}
