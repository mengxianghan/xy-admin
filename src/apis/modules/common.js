import request from '@/utils/request'

// 获取欢迎页信息
export const getWelcomeData = (params) => request.basic.get('/welcome/getData', params)
// 获取分页列表
export const getPageList = (params) => request.basic.get('/common/getPageList', params)
// 获取地区列表
export const getRegionList = (params) => request.basic.get('/common/getRegionList', params, { canceled: false })

// 保存
export const saveData = (params) => request.basic.post('/common/save', params)
// 删除
export const deleteData = (params) => request.basic.post('/common/delete', params)

// 文件上传
export const upload = (params) => request.basic.post('/comment/upload', params)
