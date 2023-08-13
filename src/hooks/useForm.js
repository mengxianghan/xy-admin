import { ref } from 'vue'

export default () => {
    const formRef = ref()
    const formRecord = ref({})
    const formRules = ref(null)
    const formData = ref({})

    const formLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    }

    const formButtonLayout = {
        wrapperCol: {
            span: 18,
            offset: 6,
        },
    }

    /**
     * 重置表单
     */
    function resetForm() {
        formRecord.value = null
        formData.value = {}
        formRef.value.resetFields()
        formRef.value.clearValidate()
    }

    /**
     * 筛选输入项
     * @param input
     * @param option
     * @returns {boolean}
     */
    function filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    return {
        formRef,
        formRules,
        formRecord,
        formData,
        formLayout,
        formButtonLayout,
        resetForm,
        filterOption,
    }
}
