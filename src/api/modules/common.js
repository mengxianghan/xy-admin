import request from '@/utils/request'

// 获取 oss 配置
export const getOssConfig = params => request.default.get('', params)
// 获取列表
export const getPageList = params => request.default.get('', params)
// 删除
export const deleteRecord = params => request.default.get('', params)
// 保存
export const saveRecord = params => request.default.post('', params)

