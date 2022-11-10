<template>
    <a-row :gutter="16"
           type="flex">
        <a-col flex="1">
            <a-card :bordered="false"
                    title="示例">
                <x-form-table v-model="list"
                              :row-tpl="rowTpl">
                    <a-table-column title="姓名">
                        <template #default="{ record }">
                            <a-input v-model:value="record.name"></a-input>
                        </template>
                    </a-table-column>
                    <a-table-column title="年龄">
                        <template #default="{ record }">
                            <a-input v-model:value="record.age"></a-input>
                        </template>
                    </a-table-column>
                    <a-table-column title="性别"
                                    :width="100">
                        <template #default="{ record }">
                            <a-select v-model:value="record.sex"
                                      :options="[
                                          { label: '未知', value: 0 },
                                          { label: '男', value: 1 },
                                          { label: '女', value: 2 },
                                      ]"
                                      class="wp-100"></a-select>
                        </template>
                    </a-table-column>
                </x-form-table>
            </a-card>
        </a-col>
        <a-col flex="1">
            <a-card :bordered="false"
                    title="结果">
                <pre>{{ list }}</pre>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
export default { name: 'componentFormTable' }
</script>

<script setup>
import { onMounted, ref } from 'vue'

import cloneDeep from 'lodash/cloneDeep'

const rowTpl = { name: '', age: '', sex: 0 }
const list = ref([])

onMounted(() => {
    list.value.push(cloneDeep(rowTpl))
})
</script>

<style lang="less" scoped>

</style>
