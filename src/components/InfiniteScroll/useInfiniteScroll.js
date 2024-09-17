import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { hasIn } from 'lodash-es'

export default () => {
    const listData = ref([])
    const statusText = ref('')
    const loading = ref(false)
    const finished = ref(false)
    const error = ref(false)
    const el = ref(null)
    const onLoad = ref(() => {})
    const immediateCheck = ref(true)
    const distance = ref(30)
    const loadingText = ref('正在努力加载')
    const finishedText = ref('没有更多了')
    const errorText = ref('加载出错，点击重新加载')

    const pagination = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
    })

    watch(
        () => [loading.value, finished.value, error.value],
        () => {
            check()
        }
    )

    onBeforeUnmount(() => {
        el.value?.removeEventListener?.('scroll', check)
    })

    /**
     * 初始化
     * @param _el
     * @param option
     */
    function initInfiniteScroll(_el, option) {
        el.value = _el

        if (hasIn(option, 'onLoad')) onLoad.value = option.onLoad
        if (hasIn(option, 'immediateCheck')) immediateCheck.value = option.immediateCheck
        if (hasIn(option, 'distance')) distance.value = option.distance
        if (hasIn(option, 'loading')) loading.value = option.loading
        if (hasIn(option, 'loadingText')) loadingText.value = option.loadingText
        if (hasIn(option, 'finished')) finished.value = option.finished
        if (hasIn(option, 'finishedText')) finishedText.value = option.finishedText
        if (hasIn(option, 'error')) error.value = option.error
        if (hasIn(option, 'errorText')) errorText.value = option.errorText

        if (loading.value) {
            statusText.value = loadingText.value
        }
        if (finished.value) {
            statusText.value = finishedText.value
        }
        if (error.value) {
            statusText.value = errorText.value
        }

        if (immediateCheck.value) {
            check()
        }

        el.value?.addEventListener?.('scroll', check)
    }

    /**
     * 重置
     */
    function resetInfiniteScroll() {
        listData.value = []
        loading.value = false
        finished.value = false
        error.value = false
        statusText.value = loadingText.value
        pagination.current = 1
        pagination.pageSize = 10
        pagination.total = 0

        check()
    }

    async function check() {
        await nextTick()

        if (loading.value || finished.value || error.value) return

        const target =
            Object.prototype.toString.call(el.value) === '[object HTMLDocument]' ? document.documentElement : el.value
        const scrollHeight = target.scrollHeight
        const clientHeight = target.clientHeight
        const scrollTop = target.scrollTop
        const diff = scrollHeight - clientHeight - scrollTop
        const isReach = diff <= distance.value

        if (isReach) {
            onLoad.value.call()
        }
    }

    /**
     * 加载中
     */
    function showLoading() {
        loading.value = true
        finished.value = false
        error.value = false
        statusText.value = loadingText.value
    }

    /**
     * 加载完成
     */
    function hideLoading() {
        loading.value = false
        finished.value = false
        error.value = false
    }

    /**
     * 加载结束
     */
    function showFinished() {
        loading.value = false
        finished.value = true
        error.value = false
        statusText.value = finishedText.value
    }

    /**
     * 加载失败
     */
    function showError() {
        loading.value = false
        finished.value = false
        error.value = true
        statusText.value = errorText.value
    }

    return {
        listData,
        statusText,
        loading,
        loadingText,
        finished,
        finishedText,
        error,
        errorText,
        pagination,
        check,
        showLoading,
        hideLoading,
        showFinished,
        showError,
        initInfiniteScroll,
        resetInfiniteScroll,
    }
}
