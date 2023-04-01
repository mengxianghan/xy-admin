import { message } from 'ant-design-vue'
import { useUserStore } from '@/store'
import { merge } from 'lodash-es'
import axios from 'axios'
import JSONbig from 'json-bigint'
import Pending from './pending'

const instance = axios.create()
const pending = new Pending()
const MSG_ERROR_KEY = Symbol('GLOBAL_ERROR')

/**
 * 请求拦截
 */
instance.interceptors.request.use(
    (request) => {
        const userStore = useUserStore()
        const isLogin = userStore.isLogin
        const token = userStore.token

        if (request.canceled !== false) {
            pending.add(request)
        }

        if (isLogin) {
            request.headers['AUTH-TOKEN'] = token
        }

        return request
    },
    (err) => {
        return Promise.reject(err)
    }
)

/**
 * 响应拦截
 */
instance.interceptors.response.use(
    (response) => {
        pending.remove(response.config)
        // 错误处理
        const { code, msg = 'Network Error' } = response.data || {}
        if (![200].includes(code)) {
            message.error({
                content: msg,
                key: MSG_ERROR_KEY,
            })
        }
        return response
    },
    (err) => {
        message.error({
            content: err?.response?.data?.error || err.message,
            key: MSG_ERROR_KEY,
        })
        return Promise.reject(err)
    }
)

class Http {
    constructor(config = {}) {
        this.config = merge(
            {
                timeout: 0,
                transformResponse: [
                    function transformResponse(data) {
                        if (typeof data === 'string') {
                            try {
                                data = JSONbig({ storeAsString: true }).parse(data)
                            } catch (e) {
                                /* empty */
                            }
                        }
                        return data
                    },
                ],
            },
            config
        )
    }

    /**
     * 请求
     * @param config
     * @returns {Promise<unknown>}
     */
    request(config = {}) {
        return new Promise((resolve, reject) => {
            instance
                .request({
                    ...this.config,
                    ...config,
                })
                .then(
                    (res) => {
                        resolve(res.data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((err) => {
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
