<template>
    <a-row :gutter="16">
        <a-col :span="18">
            <a-card
                :bordered="false"
                title="基础示例">
                <x-filter
                    v-model="filterForm"
                    :data-source="basicList"
                    :label-width="100"></x-filter>
            </a-card>
            <a-card
                :bordered="false"
                title="使用按钮"
                class="mt-8-2">
                <x-filter
                    v-model="filterForm"
                    :data-source="basicList"
                    :label-width="100"
                    use-button
                    @ok="handleOk"
                    @reset="handleReset"></x-filter>
            </a-card>
            <a-card
                :bordered="false"
                title="自定义内容"
                class="mt-8-2">
                <x-filter
                    v-model="filterForm"
                    :data-source="customList"
                    :label-width="100"
                    use-button
                    @ok="handleOk">
                    <template #praise="{ record }">
                        <x-filter-item :label="record.label">
                            <a-select
                                v-model:value="record.value"
                                :options="[
                                    { label: '好评', value: '好评' },
                                    { label: '中评', value: '中评' },
                                    { label: '差评', value: '差评' },
                                ]"></a-select>
                        </x-filter-item>
                    </template>
                    <template #filter="{ record }">
                        <x-filter-item :label="record.label">
                            <a-switch v-model:checked="record.value"></a-switch>
                        </x-filter-item>
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
export default { name: 'componentFilter' }
</script>

<script setup>
import { ref } from 'vue'

const basicList = ref([
    {
        label: '单选',
        key: 'key',
        type: 'tag',
        options: [
            { label: '全部', value: 0 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
            { label: '选项4', value: 4 },
            { label: '选项5', value: 5 },
        ],
    },
    {
        label: '多选',
        key: 'key1',
        type: 'tag',
        multiple: true,
        options: [
            { label: '全部', value: 0 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
            { label: '选项4', value: 4 },
            { label: '选项5', value: 5 },
        ],
    },
    { label: '自定义输入', key: 'key2', type: 'input' },
    { label: '自定义区间', key: 'key3', type: 'inputRange' },
    { label: '日期', key: 'key4', type: 'date', valueFormat: 'YYYY-MM-DD' },
    { label: '日期区间', key: 'key5', type: 'dateRange', valueFormat: 'YYYY-MM-DD' },
])
const customList = ref([
    {
        label: '单选',
        key: 'key',
        type: 'tag',
        options: [
            { label: '全部', value: 0 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
            { label: '选项4', value: 4 },
            { label: '选项5', value: 5 },
        ],
    },
    { label: '好评度', key: 'praise', scopedSlot: true },
    { label: '过滤数据', key: 'filter', scopedSlot: true },
])

const filterForm = ref({
    praise: '好评',
})

function handleOk(value) {
    filterForm.value = value
}

function handleReset() {
    filterForm.value = {}
}
</script>

<style scoped></style>
