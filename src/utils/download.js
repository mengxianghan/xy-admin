import {isUrl} from '@/utils/is'
import {message} from 'ant-design-vue'

/**
 * 下载文件
 * @param fileUrl
 * @param fileName
 */
export function downloadFile(fileUrl, fileName) {
    if (!isUrl(fileUrl)) {
        message.warning('下载地址为空')
        return
    }
    let el = document.createElement('a')
    el.href = fileUrl
    el.target = '_blank'
    if (fileName) el.download = fileName //下载后文件名
    document.body.appendChild(el)
    el.click() //点击下载
    document.body.removeChild(el) //下载完成移除元素
}
