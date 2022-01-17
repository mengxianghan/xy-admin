import request from '@/utils/request'

// 获取分页列表
export const getPageList = params => request.default.post('/data/getPageList', params)
