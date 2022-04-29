<template>
    <div>
        <x-search>
            <a-form-model layout="inline"
                          :model="searchForm"
                          ref="searchForm">
                <a-row :gutter="16">
                    <a-col v-bind="searchLayout">
                        <a-form-model-item>
                            <a-input v-model="searchForm.title"
                                     allow-clear
                                     placeholder="请输入标题"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col v-bind="searchLayout">
                        <a-form-model-item>
                            <a-select v-model="searchForm.status"
                                      allow-clear
                                      placeholder="请选择状态"
                                      @change="onSearch"></a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col v-bind="searchLayout">
                        <a-form-model-item>
                            <a-button type="primary"
                                      icon="search"
                                      @click="onSearch">搜索
                            </a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </x-search>

        <a-card :bordered="false">
            <x-action-bar>
                <a-button type="primary"
                          icon="plus"
                          @click="$refs.edit.handleCreate()">新增
                </a-button>
            </x-action-bar>

            <a-table :columns="columns"
                     :data-source="list"
                     :pagination="pagination"
                     :loading="loading"
                     row-key="id"
                     @change="onTableChange">
                <template #action="text, record, index">
                    <x-action-button><a @click="$refs.edit.handleEdit(record)">编辑</a></x-action-button>
                    <x-action-button>
                        <a-popconfirm title="确认删除？"
                                      @confirm="handleDelete(record)">
                            <a>删除</a>
                        </a-popconfirm>
                    </x-action-button>
                    <x-action-button>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link">
                                <span>更多</span>
                                <a-icon type="down"/>
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item key="0">
                                    1st menu item
                                </a-menu-item>
                                <a-menu-item key="1">
                                    2nd menu item
                                </a-menu-item>
                                <a-menu-divider/>
                                <a-menu-item key="3">
                                    3rd menu item
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </x-action-button>
                </template>
            </a-table>

            <edit ref="edit"
                  @ok="onOk"></edit>
        </a-card>
    </div>
</template>

<script>
import Edit from './components/Edit'
import pagination from '@/mixins/pagination'

export default {
    name: 'tableList',
    components: {Edit},
    mixins: [pagination],
    data() {
        const columns = [
            {title: '标题', dataIndex: 'title'},
            {title: '日期', dataIndex: 'date'},
            {title: '操作', key: 'action', width: 160, scopedSlots: {customRender: 'action'}}
        ]
        return {
            columns,
            list: [
                {
                    id: '1',
                    title: 'John Brown',
                    date: '2021-04-07'
                },
                {
                    id: '2',
                    title: 'Jim Green',
                    date: '2021-04-07'
                }
            ]
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        /**
         * 获取列表
         */
        async getPageList() {
            try {
                const {pagination: {current, pageSize}, searchForm} = this
                this.loading = true
                const {code, data: {list, total}} = await this.$http.common.getPageList({
                    pageSize,
                    current,
                    ...searchForm
                }).catch(() => {
                    throw new Error()
                })
                this.loading = false
                if (code === '200') {
                    this.list = list
                    this.pagination = {
                        ...this.pagination,
                        total
                    }
                }
            } catch (err) {
                this.loading = false
            }
        },
        /**
         * 删除
         * @param {object} record
         */
        async handleDelete({id}) {
            try {
                this.loading = true
                const {code} = await this.$http.common.deleteRecord({
                    id
                }).catch(() => {
                    throw new Error()
                })
                if (code === '200') {
                    this.updatePagination()
                    this.getPageList()
                } else {
                    this.loading = false
                }
            } catch (err) {
                this.loading = false
            }
        },
        /**
         * 完成
         */
        onOk() {
            this.getPageList()
        },
        /**
         * 分页
         * @param current
         * @param pageSize
         */
        onTableChange({current, pageSize}) {
            this.pagination = {
                ...this.pagination,
                current,
                pageSize
            }
            this.getPageList()
        }
    }
}
</script>

<style scoped>

</style>
