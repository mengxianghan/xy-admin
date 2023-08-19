import { message } from 'ant-design-vue'
import { cloneDeep, findIndex, isEmpty } from 'lodash-es'
import { defineStore } from 'pinia'

import router from '@/router'

import useAppStore from './app'

const useMultiTabStore = defineStore('multiTab', {
    state: () => ({
        list: [],
        cacheList: [],
        iframeList: [],
        current: 0,
        keepAlive: true,
    }),
    getters: {},
    actions: {
        /**
         * 打开
         * @param {object} route
         */
        open({ route } = {}) {
            const index = findIndex(this.list, { path: route?.path })
            // 判断是否已存在
            if (index > -1) {
                // 已存在
                this._setCurrent(index)
                this._setList({
                    index,
                    length: 1,
                    value: route,
                })
            } else {
                // 不存在，判断是否第一个标签页
                if (this.list.length) {
                    // 不是第一个标签页
                    this._setList({
                        index: this.current + 1,
                        length: 0,
                        value: route,
                    })
                    this._setCurrent(this.current + 1)
                } else {
                    // 是第一个标签页
                    this._setList({
                        value: route,
                    })
                    this._setCurrent(0)
                }
            }
            this._setIframeList()
        },
        /**
         * 关闭
         * @param {object} route
         */
        close({ route } = {}) {
            // 如果未传入路由，则默认当前路由
            route = route || this.list[this.current]
            const index = findIndex(this.list, { path: route?.path })
            // 判断标签页是否存在
            if (index < 0) return

            // 禁止关闭最后一个标签页
            // if (this.list.length === 1) {
            //     message.warning('至少保留一个标签页')
            //     return
            // }

            this._setList({
                index,
                length: 1,
            })

            // 关闭当前标签页
            if (this.current === index) {
                // 关闭最右侧标签页
                if (this.current === this.list.length) {
                    this._setCurrent(this.current - 1)
                }
                const next = this.list[this.current]
                if (next) {
                    router.push(next)
                }
            }

            // 关闭左侧标签页
            if (this.current > index) {
                this._setCurrent(this.current - 1)
            }

            this._setIframeList()
        },
        /**
         * 关闭左侧
         * @param {object} route
         */
        closeLeft({ route } = {}) {
            return new Promise((resolve) => {
                const index = findIndex(this.list, { path: route?.path })
                this._setList({
                    index: 0,
                    length: index,
                })
                if (this.current <= index) {
                    this._setCurrent(0)
                } else {
                    this._setCurrent(this.current - index)
                }
                this._setIframeList()
                if (this.current < index) {
                    resolve({ route })
                }
            })
        },
        /**
         * 关闭右侧
         * @param {object} route
         */
        closeRight({ route } = {}) {
            return new Promise((resolve) => {
                const index = findIndex(this.list, { path: route?.path })
                const length = this.list.length - index
                this._setList({
                    index: index + 1,
                    length,
                })
                this._setIframeList()
                if (this.current > index) {
                    this._setCurrent(index)
                    resolve({ route })
                }
            })
        },
        /**
         * 关闭其他
         * @param {object} route
         */
        closeOther({ route } = {}) {
            this._setList({
                index: 0,
                length: this.list.length,
                value: route,
            })
            this._setCurrent(0)
            this._setIframeList()
        },
        /**
         * 刷新
         * @param {object} route
         */
        reload({ route }) {
            this._setCacheList({ route })
        },
        /**
         * 设置标题
         * @param {object} route
         * @param {string} title
         */
        setTitle({ route, title }) {
            if (isEmpty(title)) {
                message.warning('标题不能为空')
                return
            }
            const index = findIndex(this.list, { path: route.path })
            if (index === -1) {
                message.warning('标签页不存在')
                return
            }
            this.list[index].meta.title = title
        },
        /**
         * 设置当前页
         * @param current
         * @constructor
         */
        _setCurrent(current) {
            this.current = current
        },
        /**
         * 设置列表
         * @param index
         * @param length
         * @param value
         * @constructor
         */
        _setList({ index, length, value }) {
            const appStore = useAppStore()
            // 判断是否第一个标签页
            if (this.list.length) {
                // 不是第一个标签页，判断是删除还是替换
                if (value) {
                    // 替换
                    this.list.splice(index, length, value)
                } else {
                    // 删除
                    this.list.splice(index, length)
                }
            } else {
                // 是第一个标签页
                this.list.push(value)
            }
            // 判断是否禁用了标签页
            if (!appStore.config.multiTab) {
                this.cacheList = []
                return
            }
            // 更新缓存列表
            this.cacheList = this.list.filter((item) => item?.meta?.keepAlive).map((item) => item.name)
        },
        /**
         * 设置缓存列表
         * @param route
         * @constructor
         */
        _setCacheList({ route }) {
            // 判断是否是需要缓存的页面
            if (route?.meta?.keepAlive) {
                // 是需要缓存的页面
                const index = findIndex(this.cacheList, (o) => o === route.name)
                // 判断是移除或添加
                if (index > -1) {
                    // 已存在，执行移除操作
                    this.cacheList.splice(index, 1)
                    this.keepAlive = false
                } else {
                    // 不存在，执行添加操作
                    this.cacheList.push(route.name)
                    this.keepAlive = true
                }
            } else {
                // 不是需要缓存的页面
                this.keepAlive = !this.keepAlive
            }
            // 如果刷新的是 iframe
            if (route?.meta?.isIframe) {
                const iframeIndex = findIndex(this.iframeList, { path: route?.path })
                this.iframeList[iframeIndex].meta.url = ''
                setTimeout(() => {
                    this.iframeList[iframeIndex].meta.url = route?.meta?.url
                }, 200)
            }
        },
        /**
         * 设置 iframe 列表
         */
        _setIframeList() {
            this.iframeList = cloneDeep(this.list).filter((item) => item?.meta?.isIframe)
        },
    },
})

export default useMultiTabStore
