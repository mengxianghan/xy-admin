import request from '@/utils/request'

// 获取角色列表
export const getUserRoleList = params => request.default.get('/system/getUserRoleList', params)
// 获取用户分页列表
export const getUserPageList = params => request.default.get('/system/getUserPageList', params)
// 获取菜单列表
export const getMenuList = params => request.default.get('/system/getMenuList', params)
// 获取字典分类列表
export const getDictTypeList = params => request.default.get('/system/getDictTypeList', params)
