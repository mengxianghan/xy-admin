import { request } from '@/utils'

// 获取角色列表
export const getUserRoleList = params => request.basic.get('/system/getUserRoleList', params)
// 获取用户分页列表
export const getUserPageList = params => request.basic.get('/system/getUserPageList', params)
// 获取菜单列表
export const getMenuList = params => request.basic.get('/system/getMenuList', params)
// 获取新版菜单列表
export const getNewMenuList = params => request.basic.get('/system/getNewMenuList', params)
// 获取字典分类列表
export const getDictTypeList = params => request.basic.get('/system/getDictTypeList', params)
