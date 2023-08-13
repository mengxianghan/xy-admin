<template>
    <a-page-header
        :ghost="false"
        main
        title="高级表单">
        高级表单常见于一次性输入和提交大批量数据的场景。
    </a-page-header>
    <a-form layout="vertical">
        <a-card
            class="mb-8-2"
            title="仓库管理">
            <a-row :gutter="8">
                <a-col
                    :lg="6"
                    :md="12"
                    :sm="24">
                    <a-form-item label="仓库名">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="8"
                    :md="12"
                    :sm="24"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="仓库域名">
                        <a-input allow-clear>
                            <template #addonBefore>https://</template>
                            <template #addonAfter>.com</template>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="10"
                    :md="24"
                    :sm="24"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="仓库管理员">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="6"
                    :md="12"
                    :sm="24">
                    <a-form-item label="审批人">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="8"
                    :md="12"
                    :sm="24"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="生效日期">
                        <a-range-picker
                            :style="{ width: '100%' }"
                            allow-clear></a-range-picker>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="10"
                    :md="24"
                    :sm="24"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="仓库类型">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card
            class="mb-8-2"
            title="任务管理">
            <a-row :gutter="8">
                <a-col
                    :lg="6"
                    :md="12"
                    :sm="24">
                    <a-form-item label="任务名">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="8"
                    :md="12"
                    :sm="24"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="任务描述">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="10"
                    :md="24"
                    :sm="24"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="执行人">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="6"
                    :md="12"
                    :sm="24">
                    <a-form-item label="责任人">
                        <a-input allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="8"
                    :md="12"
                    :sm="24"
                    :xl="{ span: 6, offset: 2 }">
                    <a-form-item label="生效日期">
                        <a-date-picker
                            :style="{ width: '100%' }"
                            allow-clear
                            placeholder=""></a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col
                    :lg="10"
                    :md="24"
                    :sm="24"
                    :xl="{ span: 8, offset: 2 }">
                    <a-form-item label="任务类型">
                        <a-select allow-clear></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card title="成员管理">
            <a-table
                :columns="columns"
                :data-source="listData"
                :pagination="false"
                row-key="id">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'action'">
                        <x-action-button>编辑</x-action-button>
                    </template>
                </template>
            </a-table>

            <a-button
                block
                class="mt-8-2"
                type="dashed">
                <template #icon>
                    <plus-outlined></plus-outlined>
                </template>
                添加一行数据
            </a-button>
        </a-card>
    </a-form>
</template>

<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'formAdvanced',
})

const columns = [
    { title: '成员姓名', dataIndex: 'name' },
    { title: '工号', dataIndex: 'number' },
    { title: '所属部门', dataIndex: 'department' },
    { title: '操作', dataIndex: 'action', key: 'action' },
]
const listData = [
    { id: '1', name: 'John Brown', number: '00001', department: 'New York No. 1 Lake Park' },
    { id: '2', name: 'Jim Green', number: '00002', department: 'London No. 1 Lake Park' },
    { id: '3', name: 'Joe Black', number: '00003', department: 'Sidney No. 1 Lake Park' },
]
</script>

<style lang="less" scoped></style>
