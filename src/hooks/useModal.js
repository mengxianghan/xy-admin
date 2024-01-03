import { ref, watch, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'
import { debounce } from 'lodash-es'

export default (options = {}) => {
    const opts = {
        opened: () => {},
        closed: () => {},
        draggable: false,
        selector: null,
        handleSelector: '.ant-modal-header',
        ...options,
    }
    const DELAY = 150

    const modal = ref({
        type: '',
        title: '',
        open: false,
        confirmLoading: false,
    })
    const modalRef = ref(null)
    const handleRef = ref(null)
    const contentRef = ref(null)
    const startedDrag = ref(false)
    const startX = ref(0)
    const startY = ref(0)
    const transformX = ref(0)
    const transformY = ref(0)
    const preTransformX = ref(0)
    const preTransformY = ref(0)
    const dragRect = ref({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    })
    const stopWatchEffect = ref()

    const onWindowResize = debounce(() => {
        resetDrag()
    }, 300)

    /**
     * 设置弹窗
     * @param options
     */
    function setModal(options = {}) {
        modal.value = {
            ...modal.value,
            ...options,
        }
    }

    /**
     * 显示弹窗
     * @param options
     */
    function openModal(options = {}) {
        setModal({
            open: true,
            ...options,
        })
        setTimeout(() => {
            initDrag()
            opts?.opened?.()
        }, 300)
    }

    /**
     * 隐藏弹窗
     */
    function closeModal() {
        setModal({
            type: '',
            open: false,
            confirmLoading: false,
        })

        setTimeout(() => {
            if (opts.draggable) {
                window.removeEventListener('resize', onWindowResize)
                destroyDrag()
            }
            opts?.closed?.()
        }, 300)
    }

    /**
     * 显示 loading
     */
    function showLoading() {
        setModal({
            confirmLoading: true,
        })
    }

    /**
     * 隐藏 loading
     */
    function hideLoading() {
        setModal({
            confirmLoading: false,
        })
    }

    /**
     * 初始化拖转
     * @returns {void}
     */
    function initDrag() {
        if (!opts.draggable) return

        modalRef.value = document.querySelector(opts.selector)

        if (!modalRef.value) {
            console.error('未找到有效的拖拽容器')
            return
        }

        handleRef.value = modalRef.value.querySelector(opts.handleSelector)

        if (!handleRef.value) {
            console.error('未找到有效的拖拽手柄')
            return
        }

        contentRef.value = modalRef.value.querySelector('.ant-modal-content')

        handleRef.value.style.cursor = 'move'

        const { x, y, isDragging } = useDraggable(handleRef.value)

        watch([x, y], () => {
            if (!startedDrag.value) {
                const bodyRect = document.body.getBoundingClientRect()
                const handleRect = handleRef.value.getBoundingClientRect()

                startX.value = x.value
                startY.value = y.value
                dragRect.value.right = bodyRect.width - handleRect.width
                dragRect.value.bottom = bodyRect.height - handleRect.height
                preTransformX.value = transformX.value
                preTransformY.value = transformY.value
            }
            startedDrag.value = true
        })

        watch(isDragging, () => {
            if (!isDragging.value) {
                startedDrag.value = false
            }
        })

        stopWatchEffect.value = watchEffect(() => {
            if (startedDrag.value) {
                transformX.value =
                    preTransformX.value +
                    Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
                    startX.value
                transformY.value =
                    preTransformY.value +
                    Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
                    startY.value

                contentRef.value.style.transform = `translate(${transformX.value}px, ${transformY.value}px)`
            }
        })

        window.addEventListener('resize', onWindowResize)
    }

    /**
     * 重置拖拽
     * @returns {void}
     */
    function resetDrag() {
        if (!opts.draggable) return

        startedDrag.value = false
        startX.value = 0
        startY.value = 0
        transformX.value = 0
        transformY.value = 0
        preTransformX.value = 0
        preTransformY.value = 0
        dragRect.value = { left: 0, right: 0, top: 0, bottom: 0 }

        contentRef.value.style.transition = `transform ${DELAY}ms`
        contentRef.value.style.transform = ''

        setTimeout(() => {
            contentRef.value.style.transition = ''
        }, DELAY)
    }

    /**
     * 销毁拖拽
     * @returns {void}
     */
    function destroyDrag() {
        if (!opts.draggable) return

        resetDrag()

        stopWatchEffect.value?.()
    }

    return {
        modal,
        openModal,
        closeModal,
        showLoading,
        hideLoading,
    }
}
