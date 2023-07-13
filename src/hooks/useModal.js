import { ref } from 'vue'

export default () => {
    const modal = ref({
        type: '',
        title: '',
        open: false,
        confirmLoading: false,
    })

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
    function showModal(options = {}) {
        setModal({
            open: true,
            ...options,
        })
    }

    /**
     * 隐藏弹窗
     */
    function hideModal() {
        setModal({
            type: '',
            open: false,
            confirmLoading: false,
        })
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

    return {
        modal,
        showModal,
        hideModal,
        showLoading,
        hideLoading,
    }
}
