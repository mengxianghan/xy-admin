import {reactive, ref, toRefs} from 'vue'

export default () => {
    const formRef = ref({})
    const form = reactive({
        formState: {},
        rules: {},
        row: {},
    })

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
    const resetForm = () => {
        form.formState = {}
        form.row = {}
        formRef.value.resetFields()
        formRef.value.clearValidate()
    }

    /**
     * 筛选输入项
     * @param input
     * @param option
     * @returns {boolean}
     */
    const filterOption = (input, option) => {
        return (
            option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
    }

    return {
        ...toRefs(form),
        form,
        formRef,
        formLayout,
        formButtonLayout,
        resetForm,
        filterOption,
    }
}
