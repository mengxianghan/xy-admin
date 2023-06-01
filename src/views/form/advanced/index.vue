<template>
    <a-page-header
        class="ant-page-header-wrap"
        title="高级表单"
        :ghost="false">
        高级表单常见于一次性输入和提交大批量数据的场景。
    </a-page-header>
    <a-form layout="vertical">
        <a-card
            class="mb-8-2"
            title="仓库管理"
            :bordered="false">
            <a-row :gutter="8">
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="6">
                    <a-form-item label="仓库名">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="8"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="仓库域名">
                        <a-input allow-clear>
                            <template #addonBefore>https://</template>
                            <template #addonAfter>.com</template>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="24"
                    :lg="10"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="仓库管理员">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="6">
                    <a-form-item label="审批人">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="8"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="生效日期">
                        <a-range-picker
                            allow-clear
                            :style="{ width: '100%' }"></a-range-picker>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="24"
                    :lg="10"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="仓库类型">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card
            class="mb-8-2"
            title="任务管理"
            :bordered="false">
            <a-row :gutter="8">
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="6">
                    <a-form-item label="任务名">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="8"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="任务描述">
                        <a-input allow-clear> </a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="24"
                    :lg="10"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="执行人">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="6">
                    <a-form-item label="责任人">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="12"
                    :lg="8"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="生效日期">
                        <a-date-picker
                            allow-clear
                            placeholder=""
                            :style="{ width: '100%' }"></a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col
                    :sm="24"
                    :md="24"
                    :lg="10"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="任务类型">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card
            title="成员管理"
            :bordered="false">
            <a-table
                row-key="id"
                :columns="columns"
                :data-source="list"
                :pagination="false">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'action'">
                        <x-action-button>编辑</x-action-button>
                    </template>
                </template>
            </a-table>

            <a-button
                class="mt-8-2"
                block
                type="dashed">
                <template #icon>
                    <icon-plus-outlined></icon-plus-outlined>
                </template>
                添加一行数据
            </a-button>
        </a-card>
    </a-form>
</template>

<script setup>
defineOptions({
    name: 'formAdvanced',
})

const columns = [
    { title: '成员姓名', dataIndex: 'name' },
    { title: '工号', dataIndex: 'number' },
    { title: '所属部门', dataIndex: 'department' },
    { title: '操作', dataIndex: 'action', key: 'action' },
]
const list = [
    { id: '1', name: 'John Brown', number: '00001', department: 'New York No. 1 Lake Park' },
    { id: '2', name: 'Jim Green', number: '00002', department: 'London No. 1 Lake Park' },
    { id: '3', name: 'Joe Black', number: '00003', department: 'Sidney No. 1 Lake Park' },
]
</script>

<style lang="less" scoped></style>
