import { env } from '@/utils/util'

export default {
    namespace: env('storage_namespace'),
    isLogin: 'is_login',
    token: 'token',
    userInfo: 'user_info',
    config: 'config',
}
