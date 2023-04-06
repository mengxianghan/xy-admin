<template>
    <a-row :gutter="16">
        <a-col :span="18">
            <a-card
                :bordered="false"
                title="基础示例">
                <x-filter
                    v-model="filterForm"
                    :data-source="basicList"
                    :label-width="100">
                </x-filter>
            </a-card>
            <a-card
                :bordered="false"
                title="底部按钮"
                class="mt-8-2">
                <x-filter
                    v-model="filterForm"
                    footer
                    :data-source="basicList"
                    :label-width="100"
                    @ok="onOk"
                    @reset="onReset"></x-filter>
            </a-card>
            <a-card
                :bordered="false"
                title="高级示例"
                class="mt-8-2">
                <x-filter
                    v-model="filterForm"
                    footer
                    :data-source="customList"
                    :label-width="100">
                    <template #default="{ record }">
                        <template v-if="record.key === 'key3'">
                            <x-filter-item>
                                <template #label>
                                    <a-space :size="4">
                                        {{ record.label }}
                                        <a-tooltip title="按实际情况填写">
                                            <question-circle-outlined
                                                class="color-secondary"></question-circle-outlined>
                                        </a-tooltip>
                                    </a-space>
                                </template>
                                <a-select
                                    v-model:value="filterForm[record.key]"
                                    :style="{ width: '80px' }"
                                    :options="[
                                        { label: '好评', value: '好评' },
                                        { label: '中评', value: '中评' },
                                        { label: '差评', value: '差评' },
                                    ]"></a-select>
                            </x-filter-item>
                        </template>
                        <template v-if="record.key === 'key4'">
                            <x-filter-item :label="record.label">
                                <a-switch
                                    v-model:checked="filterForm[record.key]"
                                    size="small"></a-switch>
                            </x-filter-item>
                        </template>
                        <template v-if="record.key === 'key5'">
                            <x-filter-item :label="record.label">
                                <template #label>
                                    <a-space :size="4">
                                        {{ record.label }}
                                        <a-tooltip title="DIY标签">
                                            <question-circle-outlined
                                                class="color-secondary"></question-circle-outlined>
                                        </a-tooltip>
                                    </a-space>
                                </template>
                                <x-filter-tag v-model="filterForm[record.key]">
                                    <x-filter-tag-item :value="1">
                                        <span class="mr-4-1">🇨🇳</span>
                                        <span>中国</span>
                                    </x-filter-tag-item>
                                    <x-filter-tag-item :value="2">
                                        <span class="mr-4-1">🇨🇺</span>
                                        <span>美国</span>
                                    </x-filter-tag-item>
                                    <x-filter-tag-item :value="3">
                                        <span class="mr-4-1">🇯🇵</span>
                                        <span>日本</span>
                                    </x-filter-tag-item>
                                    <x-filter-tag-item :value="4">
                                        <span class="mr-4-1">🇰🇷</span>
                                        <span>韩国</span>
                                    </x-filter-tag-item>
                                </x-filter-tag>
                            </x-filter-item>
                        </template>
                    </template>
                    <template #footer>
                        <a-space>
                            <a-button
                                type="primary"
                                @click="onOk">
                                确定
                            </a-button>
                            <a-button @click="onReset"> 重置 </a-button>
                            <span>自定义底部内容</span>
                        </a-space>
                    </template>
                </x-filter>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="结果">
                <pre>{{ filterForm }}</pre>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

export default {
    name: 'componentFilter',
    components: { QuestionCircleOutlined },
    setup() {
        const basicList = ref([
            {
                label: '单选',
                key: 'key',
                allowClear: false,
                options: [
                    { label: '不限', value: 0 },
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
            {
                label: '多选',
                key: 'key1',
                multiple: true,
                collapsible: true,
                options: [
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
        ])
        const customList = ref([
            {
                label: '单选',
                key: 'key',
                options: [
                    { label: '不限', value: 0 },
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
            {
                label: '单选(可取消)',
                key: 'key2',
                allowClear: true,
                options: [
                    { label: '不限', value: 0 },
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
            {
                label: '多选',
                key: 'key1',
                multiple: true,
                options: [
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
            { label: '好评度', key: 'key3' },
            {
                label: 'DIY标签',
                key: 'key5',
            },
            { label: '过滤数据', key: 'key4' },
            {
                label: '展开/收起',
                key: 'key',
                allowClear: false,
                collapsible: true,
                // collapsed: true,
                options: [
                    { label: '不限', value: 0 },
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                    { label: '选项6', value: 6 },
                    { label: '选项7', value: 7 },
                    { label: '选项8', value: 8 },
                    { label: '选项9', value: 9 },
                    { label: '选项10', value: 10 },
                    { label: '选项11', value: 11 },
                    { label: '选项12', value: 12 },
                    { label: '选项13', value: 13 },
                    { label: '选项14', value: 14 },
                    { label: '选项15', value: 15 },
                    { label: '选项16', value: 16 },
                    { label: '选项17', value: 17 },
                    { label: '选项18', value: 18 },
                    { label: '选项19', value: 19 },
                    { label: '选项20', value: 20 },
                ],
            },
        ])

        const filterForm = ref({})

        function onOk() {
            message.success('点击了确定按钮')
        }

        function onReset() {
            filterForm.value = {}
            message.success('点击了重置按钮')
        }

        return {
            filterForm,
            basicList,
            customList,
            onOk,
            onReset,
        }
    },
}
</script>

<style lang="less" scoped></style>
