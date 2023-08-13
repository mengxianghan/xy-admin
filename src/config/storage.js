import { env } from '@/utils/util'

export default {
    namespace: env('storageNamespace'),
    isLogin: 'is_login',
    token: 'token',
    userInfo: 'user_info',
    permission: 'permission',
    config: 'config',
}
