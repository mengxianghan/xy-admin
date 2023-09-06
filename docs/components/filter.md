# Filter 筛选

## 示例

### 基础用法

```vue
<template>
    <x-filter-form :model="formData">
        <a-form-item label="单选">
            <x-tag-select 
                v-model="formData.key" 
                :options="options"></x-tag-select>
        </a-form-item>
    </x-filter-form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const options = ref([
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
])
</script>
```

### 多选
```vue
<template>
    <x-filter-form :model="formData">
        <a-form-item label="多选">
            <x-tag-select 
                v-model="formData.key" 
                :options="options"
                :multiple="true"></x-tag-select>
        </a-form-item>
    </x-filter-form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const options = ref([
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
])
</script>
```

### 展开/收起

```vue
<template>
    <x-filter-form :model="formData">
        <a-form-item label="展开/收起">
            <x-tag-select
                v-model="formData.key1" 
                :options="options"
                :collapsible="true"></x-tag-select>
        </a-form-item>
        <a-form-item label="默认展开">
            <x-tag-select
                v-model="formData.key2" 
                :options="options"
                :collapsible="true"
                :collapsed="false"></x-tag-select>
        </a-form-item>
        <a-form-item label="自定义按钮">
            <x-tag-select
                v-model="formData.key2" 
                :options="options"
                :collapsible="true">
                <template #collapse="{collapsed}">
                    <template v-if="collapsed">
                        点击展开
                    </template>
                    <template v-else>
                        点击收起
                    </template>
                </template>
            </x-tag-select>
        </a-form-item>
    </x-filter-form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const options = ref([
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
])
</script>
```

### 自定义节点

```vue
<template>
    <x-filter-form :model="formData">
        <a-form-item label="自定义节点">
            <x-tag-select
                v-model="formData.key" 
                :options="options"
                :field-names="{ label: 'name', value: 'id' }"></x-tag-select>
        </a-form-item>
    </x-filter-form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const options = ref([
    { name: '选项1', id: 1 },
    { name: '选项2', id: 2 },
    { name: '选项3', id: 3 },
    { name: '选项4', id: 4 },
    { name: '选项5', id: 5 },
])
</script>
```

## API

#### 参数

##### FilterForm
| 名称       | 说明                                                      | 类型            | 默认值  |
| ---------- | --------------------------------------------------------- | --------------- | ------- |
| colon      | 配置 `Form.Item` 的 `colon` 默认值                        | `boolean`       | `true`  |
| labelAlign | label 标签的文本对齐方式                                  | `left`、`right` | `right` |
| labelCol   | label 标签布局，同 `Form` 组件                            | `object`        | `-`     |
| labelWrap  | label 标签的文本换行方式                                  | `boolean`       | `false` |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | `object`        | `-`     |

##### TagSelect

| 名称                  | 说明                                   | 类型                    | 默认值                             |
| --------------------- | -------------------------------------- | ----------------------- | ---------------------------------- |
| modelValue（v-model） | 当前输入值                             | `object`                | `{}`                               |
| multiple              | 多选                                   | `boolean`               | `false`                            |
| options               | options 数据，详见[Options](#options)  | `array<{value, label}>` | `[]`                               |
| collapsible           | 是否可收起                             | `boolean`               | `false`                            |
| collapsed             | 是否收起，仅 `collapsible=true` 时有效 | `boolean`               | `true`                             |
| fieldNames            | 自定义节点 label、value 的字段         | `object`                | `{label: 'label', value: 'value'}` |

##### Options
| 名称  | 说明           ｜类型               | 默认值 |
| ----- | ----------------------------------- | ------ |
| value | 选中后的值   ｜ `string`、 `number` | `-`    |
| label | 显示的名称 ｜`string`、 `number`    | `-`    |

#### 插槽

| 名称     | 说明            | 返回值        |
| -------- | --------------- | ------------- |
| default  | 自定义内容      | `-`           |
| collapse | 自定义展开/收起 | `{collapsed}` |
