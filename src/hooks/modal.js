import {ref, toRefs} from 'vue'

export function useModal() {
    const modal = ref({
        type: '',
        title: '',
        visible: false,
        confirmLoading: false
    })

    /**
     * 设置弹窗
     * @param options
     */
    function setModal(options = {}) {
        modal.value = {
            ...toRefs(modal),
            ...options
        }
    }

    /**
     * 显示弹窗
     * @param options
     */
    function showModal(options = {}) {
        setModal({
            ...toRefs(modal),
            visible: true,
            ...options
        })
    }

    /**
     * 隐藏弹窗
     */
    function hideModal() {
        setModal({
            ...toRefs(modal),
            type: '',
            visible: false,
            confirmLoading: false
        })
    }

    function showLoading(){
        modal.value = {
            ...toRefs(modal),
            confirmLoading: true
        }
    }

    function hideLoading(){
        modal.value = {
            ...toRefs(modal),
            confirmLoading: false
        }
    }

    return {
        modal,
        showModal,
        hideModal,
        showLoading,
        hideLoading
    }
}
