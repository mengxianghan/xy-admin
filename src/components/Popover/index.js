import { createVNode, render } from 'vue'
import { computePosition, offset, autoPlacement, hide as floatingHide } from '@floating-ui/dom'
import { nanoid } from 'nanoid'
import PopoverConstructor from './Popover.vue'

/**
 * @type {{key: string, placement: string, showDelay: number, hideDelay: number, contextHolder: null}}
 */
let defaultOptions = {
    showDelay: 0,
    hideDelay: 150,
    appContext: null,
    placement: 'bottom-start', // 详见：https://floating-ui.com/docs/computePosition#placement
    offset: 0, // 详见：https://floating-ui.com/docs/offset
    autoPlacement: false, // 详见：https://floating-ui.com/docs/autoPlacement
    hide: false, // 详见：https://floating-ui.com/docs/hide
}

/** @type {Map<string, {showTimer: number, hideTimer: number, vm: object}>} */
let queue = new Map()

/**
 * 延迟打开
 * @param reference
 * @param options
 * @returns {function(): void}
 */
function delayShow(reference, options = {}) {
    options = { key: nanoid(6), ...defaultOptions, ...options }
    const { showDelay, key } = options
    clearHideTimer(key)
    if (showDelay) {
        const timer = setTimeout(() => {
            show(reference, options)
        }, showDelay)
        addQueue(options.key, { showTimer: timer })
    } else {
        show(reference, options)
    }

    return () => delayHide(options)
}

/**
 * 打开
 * @param reference
 * @param options
 */
function show(reference, options) {
    const container = document.createElement('div')
    const vm = createVNode(PopoverConstructor, {
        reference,
        options,
        content: options.content,
        delayHide,
        clearHideTimer,
    })
    vm.appContext = options.appContext
    render(vm, container)
    document.body.appendChild(container)

    const middleware = []

    if (options.offset) {
        middleware.push(offset(options.offset))
    }

    if (options.hide) {
        middleware.push(floatingHide(options.hide))
    }

    if (options.autoPlacement) {
        middleware.push(autoPlacement(options.autoPlacement))
    }

    computePosition(reference, vm.el, {
        placement: options.placement,
        middleware,
    }).then((instance) => {
        const { x, y, strategy } = instance
        Object.assign(vm.el.style, {
            position: strategy,
            left: `${x}px`,
            top: `${y}px`,
        })
    })

    addQueue(options.key, {
        vm,
        elements: { reference: reference, floating: vm.el },
        destroy: () => delayHide(options),
        options,
    })
}

/**
 * 延迟关闭
 * @param options
 */
function delayHide(options) {
    options = { ...defaultOptions, ...options }
    const { hideDelay } = options
    if (hideDelay) {
        const timer = setTimeout(() => {
            hide(options.key)
        }, hideDelay)
        addQueue(options.key, { hideTimer: timer })
    } else {
        hide(options.key)
    }
}

/**
 * 隐藏
 * @param key
 */
function hide(key) {
    if (key) {
        if (queue.has(key)) {
            const { vm, destroy } = queue.get(key)
            destroy()
            vm.el.parentNode.remove()
            queue.delete(key)
        }
    } else {
        queue.forEach((item) => {
            item?.destroy()
            item.vm.el.parentNode.remove()
        })
        queue.clear()
    }
}

/**
 * 清理隐藏定时器
 * @param key
 */
function clearHideTimer(key) {
    const { hideTimer } = getQueue(key, {})
    if (!hideTimer) return
    clearTimeout(hideTimer)
}

/**
 * 添加到队列
 * @param key
 * @param value
 */
function addQueue(key, value) {
    queue.set(key, { ...getQueue(key, {}), ...value })
}

/**
 * 从队列中获取
 * @param key
 * @param def
 * @returns {any|null}
 */
function getQueue(key, def = null) {
    return queue.has(key) ? queue.get(key) : def
}

const Popover = delayShow

Popover.destroy = () => {
    queue.forEach((item) => {
        delayHide(item.options)
    })
}

Popover.config = (options = {}) => {
    defaultOptions = { ...defaultOptions, ...options }
}

Popover.install = (app) => {
    defaultOptions.appContext = app._context
    app.config.globalProperties.$popover = Popover
    return app
}

export { Popover }
