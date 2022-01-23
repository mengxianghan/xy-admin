<template>
    <a-row :gutter="16">
        <a-col :span="18">
            <a-card title="基础示例">
                <x-filter v-model="filterForm"
                          :data-source="filterList"
                          :label-width="100"></x-filter>
            </a-card>
            <a-card title="使用按钮"
                    class="mt-8-2">
                <x-filter :data-source="filterList"
                          :label-width="100"
                          use-button
                          @ok="handleOk"
                          @reset="handleReset"></x-filter>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="结果">
                {{ filterForm }}
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'componentFilter',
    setup() {
        const filterList = ref([
            {
                label: '单选', key: 'key', type: 'tag',
                children: [
                    {label: '全部', value: 0},
                    {label: '选项2', value: 2},
                    {label: '选项3', value: 3},
                    {label: '选项4', value: 4},
                    {label: '选项5', value: 5},
                ],
            },
            {
                label: '多选', key: 'key1', type: 'tag', multiple: true,
                children: [
                    {label: '全部', value: 0},
                    {label: '选项2', value: 2},
                    {label: '选项3', value: 3},
                    {label: '选项4', value: 4},
                    {label: '选项5', value: 5},
                ],
            },
            {label: '自定义输入', key: 'key2', type: 'input'},
            {label: '自定义区间', key: 'key3', type: 'inputRange'},
            {label: '日期', key: 'key4', type: 'date', valueFormat: 'YYYY-MM-DD'},
            {label: '日期区间', key: 'key5', type: 'dateRange', valueFormat: 'YYYY-MM-DD'},
        ])
        const filterForm = ref({})

        function handleOk(value) {
            filterForm.value = value
        }

        function handleReset() {
            filterForm.value = {}
        }

        return {
            filterList,
            filterForm,
            handleOk,
            handleReset,
        }
    },
}
</script>

<style scoped>

</style>
