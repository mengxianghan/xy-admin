import { createVNode, render } from 'vue'

export default (options) => {
    /**
     * @type {{key: string, placement: string, showDelay: number, hideDelay: number, contextHolder: null}}
     */
    let defaultOptions = {
        key: 'popover',
        showDelay: 0,
        hideDelay: 100,
        appContext: null,
        placement: 'bottom-start', // 详见：https://floating-ui.com/docs/computePosition#placement
        offset: 0, // 详见：https://floating-ui.com/docs/offset
        autoPlacement: false, // 详见：https://floating-ui.com/docs/autoPlacement
        hide: false, // 详见：https://floating-ui.com/docs/hide
        view: null,
        ...options,
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
        options = { ...defaultOptions, ...options }
        const queueItem = getQueue(options.key)

        // 如果队列中已存（同一个目标元素），不再重复渲染
        if (reference === queueItem?.reference && hasQueue(options.key)) {
            // 更新定位
            // const { vm } = getQueue(options.key)
            // vm.component.exposed.updatePosition()
            // 清理延迟关闭定时器
            clearHideTimer(options.key)
            return () => delayHide(queueItem?.options)
        }

        // 如果不再同一个目标元素，清理指定气泡
        hide(options.key)

        if (options.showDelay) {
            const timer = setTimeout(() => {
                show(reference, options)
            }, options.showDelay)
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
        const vm = createVNode(options.view, {
            reference,
            options,
            content: options.content,
            delayHide,
            clearHideTimer,
        })
        vm.appContext = options.appContext
        render(vm, container)
        document.body.appendChild(container)
        vm.component.exposed.handleShow()

        addQueue(options.key, {
            vm,
            reference,
            floating: vm.el,
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
     * @param {string} [key]
     */
    function hide(key) {
        if (key) {
            deleteQueue(key)
        } else {
            queue.forEach((item, key) => {
                deleteQueue(key)
            })
        }
    }

    /**
     * 清理隐藏定时器
     * @param key
     */
    function clearHideTimer(key) {
        const { hideTimer } = getQueue(key, null, {})
        if (!hideTimer) return
        clearTimeout(hideTimer)
    }

    /**
     * 添加到队列
     * @param key
     * @param value
     */
    function addQueue(key, value) {
        queue.set(key, { ...getQueue(key, null, {}), ...value })
    }

    /**
     * 从队列中获取
     * @param key
     * @param {any} fieldName
     * @param {any} def
     * @returns {any|null}
     */
    function getQueue(key, fieldName = null, def = null) {
        if (!hasQueue(key)) return def

        if (fieldName) {
            return queue.get(key)?.[fieldName]
        }

        return queue.get(key)
    }

    /**
     * 从队列中移除
     * @param key
     */
    function deleteQueue(key) {
        if (!hasQueue(key)) return
        const { vm } = queue.get(key)
        vm.component.exposed.handleHide()
        vm.el.parentNode?.remove()
        clearHideTimer(key)
        queue.delete(key)
    }

    /**
     * 是否在队列中
     * @param key
     * @returns {boolean}
     */
    function hasQueue(key) {
        return queue.has(key)
    }

    const Popover = delayShow

    Popover.destroy = () => {
        queue.forEach((item) => {
            delayHide({ ...item.options, delayHide: 0 })
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

    return Popover
}
