import Vue from 'vue'
import antd from 'ant-design-vue'
import api from '@/api'
import XPreview from '@/components/XPreview'
import XLoading from '@/components/XLoading'
import {useOssBase} from '@/utils/oss'
import '@/directives/action'
import '@/core/permission'
import 'ant-design-vue/dist/antd.less'
import 'nprogress/nprogress.css'
import '@/styles/index.less'

Vue.use(antd)
Vue.use(XPreview)
Vue.use(XLoading)

// 模拟数据
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

Vue.prototype.$http = api
Vue.prototype.$oss = useOssBase()
