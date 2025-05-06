import { useDraggable } from '@vueuse/core'
import { debounce, isFunction } from 'lodash-es'
import { nextTick, ref, watch, watchEffect } from 'vue'

export default (option = {}) => {
  const opts = {
    draggable: false,
    selector: null,
    handleSelector: '.ant-modal-header',
    beforeOpen: null,
    afterOpen: null,
    beforeClose: null,
    afterClose: null,
    ...option,
  }

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
  }, 500)

  /**
   * 设置弹窗
   * @param option
   */
  function setModal(option = {}) {
    modal.value = {
      ...modal.value,
      ...option,
    }
  }

  function _openModal(option) {
    setModal({
      open: true,
      ...option,
    })
    nextTick(() => {
      initDrag()
      if (isFunction(opts.afterOpen)) {
        opts.afterOpen()
      }
    })
  }

  function _closeModal() {
    setModal({
      type: '',
      open: false,
      confirmLoading: false,
    })
    nextTick(() => {
      destroyDrag()
      if (isFunction(opts.afterClose)) {
        opts.afterClose()
      }
    })
  }

  /**
   * 显示弹窗
   * @param option
   */
  function openModal(option = {}) {
    if (isFunction(opts.beforeOpen)) {
      opts.beforeOpen(() => _openModal(option))
    }
    else {
      _openModal(option)
    }
  }

  /**
   * 隐藏弹窗
   */
  function closeModal() {
    if (isFunction(opts.beforeClose)) {
      opts.beforeClose(() => _closeModal())
    }
    else {
      _closeModal()
    }
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
   * 初始化拖拽
   * @returns {void}
   */
  function initDrag() {
    if (!opts.draggable)
      return

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
        transformX.value
                    = preTransformX.value
                      + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right)
                      - startX.value
        transformY.value
                    = preTransformY.value
                      + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom)
                      - startY.value

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
    if (!opts.draggable)
      return

    const delay = 150
    startedDrag.value = false
    startX.value = 0
    startY.value = 0
    transformX.value = 0
    transformY.value = 0
    preTransformX.value = 0
    preTransformY.value = 0
    dragRect.value = { left: 0, right: 0, top: 0, bottom: 0 }

    contentRef.value.style.transition = `transform ${delay}ms`
    contentRef.value.style.transform = ''

    setTimeout(() => {
      contentRef.value.style.transition = ''
    }, delay)
  }

  /**
   * 销毁拖拽
   */
  function destroyDrag() {
    if (!opts.draggable)
      return
    window.removeEventListener('resize', onWindowResize)
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
