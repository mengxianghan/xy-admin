# Filter 筛选

## 示例

### 基础用法

```vue
<template>
    <x-filter v-model="content"
              :data-source="list"
              :label-width="100"></x-filter>
</template>

<script setup>
import { ref } from 'vue'

const content = ref({})
const list = ref([{
        label: '单选',
        key: 'key',
        options: [
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
])
</script>
```
### 取消选择

::: tip
取消选择仅用于单选
:::

```vue
<template>
    <x-filter footer
              v-model="content"
              :data-source="list"
              :label-width="100"
              @ok="handleOk"
              @reset="handleReset"></x-filter>
</template>

<script setup>
import { ref } from 'vue'

const content = ref({})
const list = ref([{
    label: '单选',
    key: 'key',
    toggle: true,
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
])

function handleOk() {
    message.success('点击了确定按钮');
}

function handleReset() {
    message.warning('点击了重置按钮');
}
</script>
```

### 底部按钮

```vue
<template>
    <x-filter footer
              v-model="content"
              :data-source="list"
              :label-width="100"
              @ok="handleOk"
              @reset="handleReset"></x-filter>
</template>

<script setup>
import { ref } from 'vue'

const content = ref({})
const list = ref([{
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
])

function handleOk() {
    message.success('点击了确定按钮')
}

function handleReset() {
    message.warning('点击了重置按钮')
}
</script>
```

### 高级用法


```vue
<template>
    <x-filter v-model="content" footer :data-source="list2" :label-width="100">
        <template #default="{ record }">
            <template v-if="record.key === 'diy'">
                <x-filter-item :data-source="record">
                    <template #label>
                        <a-space :size="4">
                            {{ record.label }}
                            <a-tooltip title="DIY标签">
                                <question-circle-outlined
                                    class="color-secondary"></question-circle-outlined>
                            </a-tooltip>
                        </a-space>
                    </template>
                    <x-filter-tag v-model="content[record.key]">
                        <x-filter-tag-item v-for="item in record.options" :key="item.value" :value="item.value">
                            <span v-if="item.icon" class="mr-4-1">{{item.icon}}</span>
                            <span>{{item.label}}</span>
                        </x-filter-tag-item>
                    </x-filter-tag>
                </x-filter-item>
            </template>
            <template v-if="record.key === 'input'">
                <x-filter-item>
                    <template #label>
                        输入框
                        <a-tooltip title="自定义的 label">
                            <info-circle-outlined/>
                        </a-tooltip>
                    </template>
                    <a-input v-model:value="content[record.key]"></a-input>
                </x-filter-item>
            </template>
            <template v-if="record.key === 'range'">
                <x-filter-item :label="record.label">
                    <a-space>
                        <a-input v-model:value="content.range1"></a-input>
                        <span>-</span>
                        <a-input v-model:value="content.range2"></a-input>
                    </a-space>
                </x-filter-item>
            </template>
            <template v-if="record.key === 'select'">
                <x-filter-item :label="record.label">
                    <a-select v-model:value="content[record.key]" :style="{width: '100px'}"></a-select>
                </x-filter-item>
            </template>
            <template v-if="record.key === 'date'">
                <x-filter-item :label="record.label">
                    <a-date-picker v-model:value="content[record.key]"></a-date-picker>
                </x-filter-item>
            </template>
        </template>
        <template #footer>
            <a-space>
                <a-button type="primary" ghost @click="()=> message.success('点击了按钮1')">按钮1</a-button>
                <a-button type="danger" ghost @click="()=> message.success('点击了按钮2')">按钮2</a-button>
                <span>自定义文本</span>
            </a-space>
        </template>
    </x-filter>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const content = ref({})
const list = ref([{
        label: '单选',
        key: 'key',
        toggle: true,
        collapsible: true,
        options: [
            { label: '不限', value: 0, isAll: true },
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
    {
        label: 'DIY',
        key: 'diy',
        multiple: true,
        options: [
            { label: '不限', value: 0, isAll: true },
            { label: '中国', value: 1, icon: '🇨🇳' },
            { label: '美国', value: 2, icon: '🇺🇸' },
            { label: '日本', value: 3, icon: '🇯🇵' },
            { label: '韩国', value: 4, icon: '🇰🇷' },
        ]
    },
    { label: '输入框', key: 'input' },
    { label: '区间', key: 'range' },
    { label: '下拉选择', key: 'select' },
    { label: '日期', key: 'date' },
])
</script>
```

## API

### Filter

#### 参数

| 名称               | 说明                                                                          | 类型        | 默认值               |
|------------------|-----------------------------------------------------------------------------|-----------|-------------------|
| v-model          | 当前输入值                                                                       | `object`  | `{}`              |
| dataSource       | 数据数组，具体详见[下表](#datasource)                                                  | `array`   | `[]`              |
| colon            | 是否显示冒号                                                                      | `boolean` | `true`            |
| labelWidth       | label 标签宽度                                                                  | `number`  | `80`              |
| labelAlign       | label 内容对齐方式，可选：`left` `right`                                              | `string`  | `right`           |
| footer           | 底部内容 `确定` `重置` 按钮                                                           | `boolean` | `false`           |
| okText           | 确认按钮文字                                                                      | `string`  | `确定`              |
| okType           | 确认按钮类型，可选：`primary` `ghost` `dashed` `link` `text` `default`                | `string`  | `primary`         |
| okButtonProps    | 确认按钮 `props`，具体详见[AntDesignVue](https://antdv.com/components/button-cn#API) | `object`  | `{ ghost: true }` |
| resetText        | 重置按钮文字                                                                      | `string`  | `重置`              |
| resetType        | 重置按钮类型，可选：`primary` `ghost` `dashed` `link` `text` `default`                | `string`  | `default`         |
| resetButtonProps | 重置按钮 `props`，具体详见[AntDesignVue](https://antdv.com/components/button-cn#API) | `object`  |                   |
| size             | 尺寸，可选：`default` `small`                                                     | `string`  | `default`         |

#### 插槽

| 名称       | 说明      | 返回值                             |
|----------|---------|---------------------------------|
| default  | 自定义内容   | `-`                             |
| footer   | 自定义底部内容 | `-`                             |
| collapse | 自定义折叠按钮 | `v-slot:collapse="{collapsed}"` |


### FilterItem

#### 参数

| 名称         | 说明                       | 类型                                 | 默认值  |
|------------|--------------------------|------------------------------------|------|
| dataSource | 数据，具体项见[下表](#datasource) | `object` `array` `string` `number` | `-`  |
| labelWidth | label 标签宽度               | `number`                           | `80` |
| label      | label 标签内容               | `string`                           | `-`  |

#### 插槽

| 名称       | 说明      | 返回值                             |
|----------|---------|---------------------------------|
| default  | 自定义内容   | `-`                             |
| label    | 自定义标签   | `-`                             |
| collapse | 自定义折叠按钮 | `v-slot:collapse="{collapsed}"` |

#### DataSource

| 名称          | 说明                              | 类型        | 默认值     |
|-------------|---------------------------------|-----------|---------|
| label       | 名称；必填                           | `string`  | `-`     |
| key         | 唯一索引；必填                         | `string`  | `-`     |
| multiple    | 多选                              | `boolean` | `-`     |
| toggle      | 切换选中/取消选中；`multiple=false` 有效   | `boolean` | `false` |
| collapsible | 是否可以展开/收起，设置为 `true` 且标签超过一行时有效 | `boolean` | `false` |
| collapsed   | 默认展开/收起状态                       | `boolean` | `false` |
| options     | 选项列表，具体项见[下表](#options)         | `array`   | `-`     |

### FilterTag

#### 参数

| 名称       | 说明                            | 类型                        | 默认值     |
|----------|-------------------------------|---------------------------|---------|
| v-model  | 当前输入值                         | `array` `string` `number` | `-`     |
| multiple | 多选                            | `boolean`                 | `false` |
| toggle   | 切换选中/取消选中；`multiple=false` 有效 | `boolean`                 | `false` |
| options  | 选项列表，具体项见[下表](#options)       | `array`                   | `-`     |

#### 插槽

| 名称      | 说明    | 默认值 |
|---------|-------|-----|
| default | 自定义内容 | `-` |

#### Options

| 名称    | 说明   | 类型                | 默认值 |
|-------|------|-------------------|-----|
| label | 选项名称 | `string` `number` | `-` |
| value | 选项值  | `string` `number` | `-` |

### FilterTagItem

#### 参数

| 名称    | 说明  | 类型                | 默认值 |
|-------|-----|-------------------|-----|
| value | 选项值 | `string` `number` | `-` |

#### 插槽

| 名称      | 说明    | 默认值 |
|---------|-------|-----|
| default | 自定义内容 | `-` |
