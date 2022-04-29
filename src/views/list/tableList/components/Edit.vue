<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :width="1200"
             :after-close="onAfterClose"
             @ok="onOk"
             @cancel="onCancel">
        <a-form-model :model="form"
                      ref="form"
                      :rules="rules"
                      v-bind="formItemLayout">
            <a-form-model-item label="标题"
                               prop="title">
                <a-input v-model="form.title"></a-input>
            </a-form-model-item>
            <a-form-model-item label="日期"
                               prop="date">
                <a-date-picker v-model="form.data"
                               format="YYYY-MM-DD"></a-date-picker>
            </a-form-model-item>
            <a-form-model-item label="内容"
                               prop="content">
                <x-tiny-editor v-model="form.content"></x-tiny-editor>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>

<script>
import form from '@/mixins/form'
import moment from 'moment'

export default {
    mixins: [form],
    data() {
        const rules = {
            title: {required: true, message: '请输入标题'}
        }
        return {
            rules
        }
    },
    methods: {
        /**
         * 新增
         */
        handleCreate() {
            this.showModal({
                type: 'create',
                title: '新建'
            })
        },
        /**
         * 编辑
         * @param {object} record
         */
        handleEdit(record) {
            this.showModal({
                type: 'edit',
                title: '编辑'
            })
            this.record = record
            const {title, image, date, content} = record
            this.form = {
                title,
                image,
                date: date ? moment(date, 'YYYY-MM-DD') : null,
                content
            }
        },
        /**
         * 确定
         */
        onOk() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        this.showLoading()
                        const {form, record} = this
                        const params = {
                            id: record?.id ?? '',
                            ...form
                        }
                        const result = await this.$http.common.saveRecord(params).catch(() => {
                            throw new Error()
                        })
                        this.hideLoading()
                        if (result.code === '200') {
                            this.hideModal()
                            this.$emit('ok')
                        }
                    } catch (err) {
                        this.hideLoading()
                    }
                }
            })
        },
        /**
         * 取消
         */
        onCancel() {
            this.hideModal()
            this.$emit('cancel')
        },
        /**
         * 关闭后
         */
        onAfterClose() {
            this.reset()
        }
    }
}
</script>

<style scoped>

</style>
