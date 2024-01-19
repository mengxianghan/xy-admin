import { message, notification } from 'ant-design-vue'
import { config } from '@/config'
import { useUserStore } from '@/store'
import jschardet from 'jschardet'
import XYHttp from 'xy-http'

const MSG_ERROR_KEY = Symbol('GLOBAL_ERROR')

const options = {
    enableAbortController: true,
    // 请求拦截
    interceptorRequest: (request) => {
        const userStore = useUserStore()
        const isLogin = userStore.isLogin
        const token = userStore.token

        if (isLogin) {
            request.headers['AUTH-TOKEN'] = token
        }
    },
    // 请求异常拦截
    interceptorRequestCatch: () => {},
    // 响应拦截
    interceptorResponse: (response) => {
        // 错误处理
        const { code, msg = '请稍后重试' } = response.data || {}
        if (![config('http.code.success'), ...config('http.code.ignore')].includes(code)) {
            notification.error({
                key: MSG_ERROR_KEY,
                message: '请求异常',
                description: msg,
            })
        }
    },
    // 响应异常拦截
    interceptorResponseCatch: (err) => {
        // 网络异常
        if ('ERR_NETWORK' === err.code) {
            message.error({
                key: MSG_ERROR_KEY,
                content: `网络异常：${err.message}`,
            })
            return
        }
        // 请求被取消
        if ('ERR_CANCELED' === err.code) return
        return Promise.reject(err)
    },
}

/**
 * 读取文件
 */
class ReadFile extends XYHttp {
    constructor() {
        super({
            baseURL: '',
            responseType: 'blob',
            transformResponse: [
                async (data) => {
                    const encoding = await this._encoding(data)
                    return new Promise((resolve) => {
                        let reader = new FileReader()
                        reader.readAsText(data, encoding)
                        reader.onload = function () {
                            resolve(reader.result)
                        }
                    })
                },
            ],
        })
    }

    /**
     * 文本编码
     * @param data
     * @returns {Promise<unknown>}
     * @private
     */
    _encoding(data) {
        return new Promise((resolve) => {
            let reader = new FileReader()
            reader.readAsBinaryString(data)
            reader.onload = function () {
                resolve(jschardet.detect(reader?.result).encoding)
            }
        })
    }
}

const basic = new XYHttp({
    ...options,
    baseURL: config('http.apiBasic'),
})

const readFile = new ReadFile()

export default {
    basic,
    readFile,
}
