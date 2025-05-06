import components from '@/components'
import { setupDirective } from '@/directives'
import { useCheckUpdate } from '@/hooks'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import antd from 'ant-design-vue'
import { setupException } from './exception'
import './permission'
import 'ant-design-vue/dist/reset.css'
import '@/styles/index.less'

useCheckUpdate()

export function useCore(app) {
  app.use(antd)
  app.use(components)
  setupException(app)
  setupStore(app)
  setupRouter(app)
  setupDirective(app)
}
