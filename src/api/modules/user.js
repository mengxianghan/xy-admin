import request from '@/utils/request'

export default {
    login: params => request.base.post('/user/login', params)
}
