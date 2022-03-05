import request from '@/utils/request'

// 获取欢迎页信息
export const getWelcomeData = params => request.default.get('/welcome/getData', params)
// 获取分页列表
export const getPageList = params => request.default.get('/common/getPageList', params)
// 获取地区列表
export const getRegionList = params => request.default.get('/common/getRegionList', params)
