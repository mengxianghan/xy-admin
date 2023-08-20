# FormTable 表单表格

## 示例

### 基本用法

```vue
<template>
    <x-form-table
        v-model="list"
        bordered
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
        <a-table-column
            title="性别"
            :width="100">
            <template #default="{ record }">
                <a-select
                    v-model:value="record.sex"
                    :options="[
                    { label: '未知', value: 0 },
                    { label: '男', value: 1 },
                    { label: '女', value: 2 },
                ]"
                    class="wp-100"></a-select>
            </template>
        </a-table-column>
    </x-form-table>

    输出示例：
    <pre>{{list}}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'

const rowTpl = { name: '', age: '', sex: 0 };
const list = ref([]);

list.value.push(cloneDeep(rowTpl))

return {
    rowTpl,
    list
}
</script>
```

## API

### 参数

| 名称      | 说明     | 类型       | 默认值  |
|---------|--------|----------|------|
| v-model | 当前输入的值 | `array`  | `[]` |
| rowTpl  | 行模板，用于插入行使用    | `object` | `{}` |

### 事件

| 名称     | 说明   | 返回值                |
|--------|------|--------------------|
| add    | 添加数据 | -                  |
| delete | 删除数据 | `function(record)` |
