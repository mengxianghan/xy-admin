import request from '@/utils/request'

// 获取动态列表
export const getDynamicList = params => request.default.post('/manage/getDynamicList', params)
// 获取分页列表
export const getPageList = params => request.default.post('/data/getPageList', params)
