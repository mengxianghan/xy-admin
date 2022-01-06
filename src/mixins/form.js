export default {
    data() {
        return {
            loading: false,
            form: {},
            modal: {
                type: '',
                title: '',
                visible: false,
                confirmLoading: false
            },
            record: {},
            formItemLayout: {
                labelCol: {
                    span: 6
                },
                wrapperCol: {
                    span: 18
                }
            },
            formButtonLayout: {
                wrapperCol: {
                    span: 18,
                    offset: 6
                }
            }
        }
    },
    methods: {
        /**
         * 设置弹窗属性
         * @param title
         */
        setModal(options) {
            this.modal = {
                ...this.modal,
                ...options
            }
        },
        /**
         * 显示弹窗
         * @param args
         */
        showModal(options = {}) {
            this.setModal({
                ...this.modal,
                visible: true,
                ...options
            })
        },
        /**
         * 隐藏弹窗
         */
        hideModal() {
            this.setModal({
                ...this.modal,
                type: '',
                //title: '',
                visible: false,
                confirmLoading: false
            })
        },
        /**
         * 显示 loading
         */
        showLoading() {
            this.$set(this.modal, 'confirmLoading', true)
        },
        /**
         * 隐藏 loading
         */
        hideLoading() {
            this.$set(this.modal, 'confirmLoading', false)
        },
        /**
         * 重置
         */
        reset() {
            this.form = this.$options.data().form
            if (this.$refs.form) {
                this.$refs.form.resetFields()
                this.$refs.form.clearValidate()
            }
            this.record = {}
            this.setModal({
                confirmLoading: false
            })
        },
        /**
         * 筛选输入项
         * @param input
         * @param option
         * @returns {boolean}
         */
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )
        }
    }
}
