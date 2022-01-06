import Storage from 'xy-storage'

export const STORE_IS_LOGIN = 'isLogin'
export const STORE_TOKEN = 'token'
export const STORE_USER_INFO = 'userInfo'
export const STORE_PERMISSION = 'permission'

export default new Storage({
    namespace: process.env.VUE_APP_STORAGE_NAMESPACE
})
