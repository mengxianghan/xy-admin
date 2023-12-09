import { message } from 'ant-design-vue'
import { config } from '@/config'
import { useUserStore } from '@/store'
import jschardet from 'jschardet'
import XYHttp from 'xy-http'

const MSG_ERROR_KEY = Symbol('GLOBAL_ERROR')

const options = {
    enableAbortController: true,
    interceptorRequest: (request) => {
        const userStore = useUserStore()
        const isLogin = userStore.isLogin
        const token = userStore.token

        if (isLogin) {
            request.headers['AUTH-TOKEN'] = token
        }
    },
    interceptorRequestCatch: () => {},
    interceptorResponse: (response) => {
        // 错误处理
        const { code, msg = 'Network Error' } = response.data || {}
        if (![200].includes(code)) {
            message.error({
                content: msg,
                key: MSG_ERROR_KEY,
            })
        }
    },
    interceptorResponseCatch: () => {},
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
