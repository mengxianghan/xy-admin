import request from '@/utils/request'

// 登录
export const login = params => request.default.post('/user/login', params)
