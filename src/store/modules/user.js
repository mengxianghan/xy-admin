import apis from '@/apis'
import { config } from '@/config'
import router from '@/router/index.js'
import { useRouterStore } from '@/store'
import { storage, timeFix } from '@/utils'
import { Modal, notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import useAppStore from './app'
import useMultiTab from './multiTab'
import useRouter from './router'

const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.local.getItem(config('storage.userInfo'), null),
    token: storage.local.getItem(config('storage.token'), ''),
  }),
  getters: {
    isLogin: state => !!state.token,
  },
  actions: {
    /**
     * 登录
     * @param {object} params
     * @returns {Promise<unknown>}
     */
    login(params) {
      return new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const result = await apis.user.login(params).catch((err) => {
              throw new Error(err)
            })
            const { code, data } = result || {}
            if (config('http.code.success') === code) {
              const { token } = data
              this.token = data.token
              storage.local.setItem(config('storage.token'), token)
              await this.getUserInfo()
            }
            resolve(result)
          }
          catch (err) {
            reject(err)
          }
        })()
      })
    },
    /**
     * 退出登录
     */
    logout() {
      return new Promise((resolve) => {
        const appStore = useAppStore()
        const multiTab = useMultiTab()
        const router = useRouter()
        storage.local.removeItem(config('storage.token'))
        storage.local.removeItem(config('storage.userInfo'))
        this.$reset()
        appStore.$reset()
        multiTab.$reset()
        router.$reset()
        resolve()
      })
    },
    /**
     * 获取用户详情
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const result = await apis.user.getUserDetail().catch((err) => {
              throw new Error(err)
            })
            const { code, data } = result || {}
            if (config('http.code.success') === code) {
              this.userInfo = data
              storage.local.setItem(config('storage.userInfo'), this.userInfo)
              resolve(result)
            }
            else {
              throw new Error(result)
            }
          }
          catch (err) {
            reject(err)
          }
        })()
      })
    },
    /**
     * 去首页
     * @param {{redirect?: string, welcomeMsg?: boolean}} [params]
     */
    async goIndex(params) {
      return new Promise((resolve, reject) => {
        ;(async () => {
          const appStore = useAppStore()
          const routerStore = useRouterStore()
          const { redirect, welcomeMsg = true } = params || {}
          // 加载完成
          if (!appStore.complete) {
            await appStore.init()
          }
          // 没有任何权限
          if (!routerStore.indexRoute) {
            Modal.warning({
              title: '系统提示',
              content: '没有任何权限，请联系系统管理员',
              onOk: () => {
                this.logout()
                window.location.reload()
              },
            })
            reject(new Error('没有任何权限，请联系系统管理员'))
            return
          }
          if (redirect) {
            location.href = redirect
          }
          else {
            router.push(routerStore.indexRoute)
          }
          if (welcomeMsg) {
            notification.success({
              message: '欢迎',
              description: `${timeFix()}，欢迎回来`,
            })
          }
        })()
      })
    },
  },
})

export default useUserStore
