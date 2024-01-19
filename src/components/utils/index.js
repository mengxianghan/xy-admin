import { Comment, Fragment, isVNode, Text } from 'vue'

/**
 * 获取插槽参数
 * @param slotProps
 * @returns {{}}
 */
export function getSlotProps(slotProps) {
    return slotProps || {}
}

/**
 * 监听前进/后退
 * @param fn
 */
export function onPopState(fn) {
    window.addEventListener('popstate', fn)
}

/**
 * 取消监听前进/后退
 * @param fn
 */
export function onUnPopState(fn) {
    window.removeEventListener('popstate', fn)
}

/**
 * 获取浏览器滚动条宽度
 * @returns {number}
 */
export function getScrollWidth() {
    const windowWidth = window.innerWidth
    const documentWidth = document.documentElement.clientWidth
    return windowWidth - documentWidth
}

export function setStyle(el, styles) {
    if (!el) return
    for (const key in styles) {
        el.style[key] = styles[key]
    }
}

/**
 * 格式化单位
 * @param value
 * @returns {*|string}
 */
export function formatUnits(value) {
    return /[a-zA-Z%]+$/.test(value) ? value : `${value}px`
}

/**
 * 载入 css
 * @param {array} urls
 */
export function loadCss(urls = []) {
    const cssList = document.querySelectorAll('link[rel="stylesheet"]')

    for (const el of cssList) {
        const href = el.href
        for (const url of urls) {
            if (url !== href) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = url
                document.getElementsByTagName('head')[0].appendChild(link)
            }
        }
    }
}

/**
 * 空元素
 * @param {*} value
 * @returns
 */
export function isEmptyElement(value) {
    return (
        value &&
        (value.type === Comment ||
            (value.type === Fragment && value.children.length === 0) ||
            (value.type === Text && value.children.trim() === ''))
    )
}

/**
 * 有效元素
 * @param {*} value
 * @returns
 */
export function isValid(value) {
    return value !== undefined && value !== null && value !== ''
}

/**
 * 拉平树节点
 * @param {*} children
 * @returns
 */
const skipFlattenKey = Symbol('skipFlatten')

export function flattenChildren(children) {
    const temp = Array.isArray(children) ? children : [children]
    const res = []
    temp.forEach((child) => {
        if (Array.isArray(child)) {
            res.push(...flattenChildren(child))
        } else if (child && child.type === Fragment) {
            if (child.key === skipFlattenKey) {
                res.push(child)
            } else {
                res.push(...flattenChildren(child.children))
            }
        } else if (child && isVNode(child)) {
            if (!isEmptyElement(child)) {
                res.push(child)
            }
        } else if (isValid(child)) {
            res.push(child)
        }
    })
    return res
}
