import request from '@/utils/request'

// 登录
export const login = (params) => request.basic.post('/user/login', params)
