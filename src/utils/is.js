/**
 * 验证 url
 * @param {string} str
 */
export function isUrl(str) {
    return new RegExp('^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+', 'g').test(str)
}
