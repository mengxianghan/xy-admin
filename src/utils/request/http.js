import {message} from 'ant-design-vue'

import merge from 'lodash/merge'
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

const instance = axios.create()

/**
 * 请求拦截
 */
instance.interceptors.request.use(request => {
    const isLogin = store.getters['user/isLogin']
    const token = store.getters['user/token']

    if (isLogin) {
        request.headers['AUTH-TOKEN'] = token
    }

    return request
}, err => {
    return Promise.reject(err)
})

/**
 * 响应拦截
 */
instance.interceptors.response.use(response => {
    // 错误处理
    const {code, msg = '系统错误'} = response.data || {}
    if (![200].includes(code)) {
        message.error(msg)
    }
    return response
}, err => {
    message.error(err?.response?.data?.message ?? err.message)
    return Promise.reject(err)
})

class Http {
    constructor(config = {}) {
        this.config = merge({
            timeout: 0,
            transformResponse: [function transformResponse(data) {
                if (typeof data === 'string') {
                    try {
                        data = JSONbig({storeAsString: true})
                            .parse(data)
                    } catch (e) {
                    }
                }
                return data
            }],
        }, config)
    }

    /**
     * 请求
     * @param config
     * @returns {Promise<unknown>}
     */
    request(config = {}) {
        return new Promise((resolve, reject) => {
            instance.request({
                        ...this.config,
                        ...config,
                    })
                    .then(res => {
                        resolve(res.data)
                    }, err => {
                        reject(err)
                    })
                    .catch(err => {
                        reject(err)
                    })
        })
    }

    /**
     * POST 请求
     * @param url
     * @param data
     * @param config
     * @returns {Promise<unknown>}
     */
    post(url = '', data = {}, config = {}) {
        return this.request({
            url: url,
            method: 'post',
            data,
            ...config,
        })
    }

    /**
     * GET 请求
     * @param url
     * @param params
     * @param config
     * @returns {Promise<unknown>}
     */
    get(url = '', params = {}, config = {}) {
        return this.request({
            url: url,
            method: 'get',
            params,
            ...config,
        })
    }

    /**
     * 上传
     * @param url
     * @param formData
     * @param config
     * @returns {Promise<unknown>}
     */
    upload(url = '', formData = {}, config = {}) {
        return this.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
            ...config,
        })
    }

    /**
     * 下载
     * @param url
     * @param config
     * @returns {Promise<unknown>}
     */
    download(url = '', config = {}) {
        return this.request({
            url: url,
            baseURL: '',
            method: 'get',
            responseType: 'blob',
            ...config,
        })
    }
}

export default Http

