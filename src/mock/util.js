/**
 * 基础数据结构
 * @type {{msg: string, code: string, data: null, timestamp: number}}
 */
const responseBody = {
    code: 200,
    msg: 'success',
    timestamp: 0,
    data: null,
}

/**
 * 构建返回的数据结构
 * @param data
 * @param code
 * @param message
 * @returns {{msg: string, code: string, data: null, timestamp: number}}
 */
export const builder = (data = {}, code = 200, message = 'success') => {
    responseBody.data = data

    if (code !== undefined && code !== 0) {
        responseBody.code = code
    }

    if (message !== undefined && message !== null) {
        responseBody.msg = message
    }

    responseBody.timestamp = new Date().getTime()
    return responseBody
}

/**
 * 获取地址栏参数
 * @param options
 * @returns {{}|any}
 */
export const getQueryParams = (options) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    )
}

/**
 * 获取body参数
 * @param options
 * @returns {*}
 */
export const getBody = (options) => {
    return options.body && JSON.parse(options.body)
}
