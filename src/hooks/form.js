import {reactive, ref, toRefs} from 'vue'

export function useForm() {
    const formRef = ref({})
    const form = reactive({
        formModel: {},
        formRules: {},
        formRecord: {},
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
        filterOption,
    }
}
