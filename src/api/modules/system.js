import request from '@/utils/request'

// 获取角色列表
export const getUserRoleList = params => request.default.get('/system/getUserRoleList', params)
// 获取用户分页列表
export const getUserPageList = params => request.default.get('/system/getUserPageList', params)