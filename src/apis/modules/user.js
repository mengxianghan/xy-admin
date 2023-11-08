import request from '@/utils/request'

// 登录
export const login = (params) => request.basic.post('/user/login', params)
// 获取用户详情
export const getUserDetail = () => request.basic.get('/user/detail')
// 获取权限列表
export const getAuthList = () => request.basic.get('/user/auth')
