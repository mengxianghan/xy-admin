import Http from './http'
import jschardet from 'jschardet'

/**
 * 读取文件
 */
class ReadFile extends Http {
    constructor() {
        super({
            baseURL: '',
            responseType: 'blob',
            transformResponse: [async (data) => {
                const encoding = await this._encoding(data)
                return new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.readAsText(data, encoding)
                    reader.onload = function (e) {
                        resolve(reader.result)
                    }
                })
            }],
        })
    }

    /**
     * 文本编码
     * @param data
     * @returns {Promise<unknown>}
     * @private
     */
    _encoding(data) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsBinaryString(data)
            reader.onload = function (e) {
                resolve(jschardet.detect(reader?.result).encoding)
            }
        })
    }
}

class Api extends Http {
    constructor(baseURL) {
        super({
            baseURL,
        })
    }
}

export default {
    readFile: new ReadFile(),
    api: new Api(),
    default: new Api(`${process.env.VUE_APP_API_DEFAULT}`),
}

