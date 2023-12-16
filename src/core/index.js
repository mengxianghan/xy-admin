import antd from 'ant-design-vue'
import components from '@/components'

import { setupDirective } from '@/directives'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupException } from './exception'

import './permission'

import 'ant-design-vue/dist/reset.css'
import '@/styles/index.less'

export const useCore = (app) => {
    app.use(antd)
    app.use(components)
    setupException(app)
    setupStore(app)
    setupRouter(app)
    setupDirective(app)
}
