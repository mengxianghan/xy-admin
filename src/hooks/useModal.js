import {ref} from 'vue'

export default () => {
    const modal = ref({
        type: '',
        title: '',
        visible: false,
        confirmLoading: false,
    })

    /**
     * 设置弹窗
     * @param options
     */
    const setModal = (options = {}) => {
        modal.value = {
            ...modal.value,
            ...options,
        }
    }

    /**
     * 显示弹窗
     * @param options
     */
    const showModal = (options = {}) => {
        setModal({
            visible: true,
            ...options,
        })
    }

    /**
     * 隐藏弹窗
     */
    const hideModal = () => {
        setModal({
            type: '',
            visible: false,
            confirmLoading: false,
        })
    }

    /**
     * 显示 loading
     */
    const showLoading = () => {
        setModal({
            confirmLoading: true,
        })
    }

    /**
     * 隐藏 loading
     */
    const hideLoading = () => {
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
