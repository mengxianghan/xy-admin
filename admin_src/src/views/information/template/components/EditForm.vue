<template>
    <a-modal v-model="visible"
             :title="title"
             :confirm-loading="confirmLoading"
             @ok="onOk"
             @cancel="onCancel">
        <a-form :form="form"
                v-bind="formItemLayout">
            <a-form-item label="名称">
                <a-input v-decorator="['name',{rules:[{required:true,message:'请输入名称'}]}]"></a-input>
            </a-form-item>
            <a-form-item label="视图">
                <a-tree-select v-decorator="['menu_id',{rules:[{required:true,message:'请选择视图'}]}]"
                               :tree-data="menuList"
                               :loading="menuLoading"></a-tree-select>
            </a-form-item>
            <a-form-item label="状态">
                <a-radio-group v-decorator="['status',{initialValue:'1'}]">
                    <a-radio value="1">正常</a-radio>
                    <a-radio value="0">禁用</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="排序">
                <a-input-number v-decorator="['sort',{initialValue:'99'}]"></a-input-number>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import form from '@/mixins/form'

    export default {
        mixins: [form],
        data() {
            return {
                menuList: [],
                menuLoading: false
            }
        },
        created() {
        },
        watch: {
            visible(val) {
                if (val && !this.menuList.length) {
                    this.getMenuList()
                }
            }
        },
        methods: {
            /**
             * 获取菜单列表
             */
            async getMenuList() {
                this.menuLoading = true
                const {code, data: {list}} = await this.$api.system.menu.getList({
                    status: '1'
                })
                this.menuLoading = false
                if (code === '200') {
                    this.menuList = this.$xy.util.changeKeys(list)
                }
            },
            /**
             * 新增
             */
            handleInsert() {
                this.toggleModal()
                this.title = '新增模板'
            },
            /**
             * 编辑
             */
            handleEdit(record) {
                this.toggleModal()
                this.record = record
                this.title = '编辑模板'
                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        name: record.name,
                        menu_id: record.menu_id,
                        status: record.status,
                        sort: record.sort
                    })
                })
            },
            /**
             * 删除
             * @param record
             */
            handleDelete(record) {
                this.$api.information.template.delete({
                    id: record.id
                }).then(({code}) => {
                    if (code === '200') {
                        this.$emit('delete', record)
                        this.$emit('complete', record)
                    }
                })
            },
            /**
             * 确认
             */
            onOk() {
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        this.confirmLoading = true
                        this.$api.information.template.submit({
                            id: this.record.id,
                            name: values.name,
                            menu_id: values.menu_id,
                            status: values.status,
                            sort: values.sort
                        }).then(({code}) => {
                            this.confirmLoading = false
                            if (code === '200') {
                                this.reset()
                                this.toggleModal()
                                this.$emit('ok')
                                this.$emit('complete', values)
                            }
                        }, err => {
                            this.confirmLoading = false
                        })
                    }
                })
            },
            /**
             * 取消
             */
            onCancel() {
                this.reset()
                this.toggleModal()
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>
