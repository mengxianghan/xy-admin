class Pending {
    #queue

    constructor() {
        this.#queue = new Map()
    }

    /**
     * 加入到队列
     * @param {object} config
     */
    add(config) {
        const key = this.#generateKey(config)
        const controller = new AbortController()
        if (this.#queue.has(key)) {
            this.#queue.get(key).abort()
        }
        config.signal = controller.signal
        this.#queue.set(key, controller)
    }

    /**
     * 从队列中移除
     * @param {object} config
     */
    remove(config) {
        const key = this.#generateKey(config)
        if (this.#queue.has(key)) {
            this.#queue.delete(key)
        }
    }

    /**
     * 取消所有请求
     */
    clear() {
        this.#queue.forEach((value, key) => {
            value.abort()
            this.#queue.delete(key)
        })
    }

    /**
     * 生成唯一 key
     * @param {object} config
     * @param {string} config.method
     * @param {string} config.baseURL
     * @param {string} config.url
     * @returns
     */
    #generateKey(config) {
        const { method, baseURL, url } = config
        return `${method.toLocaleLowerCase()}.${baseURL}${url}`
    }
}

export default Pending
