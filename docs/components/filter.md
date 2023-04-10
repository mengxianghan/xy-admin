# Filter 筛选

## 示例

### 基本使用

```vue

<template>
    <x-filter v-model="filterState" 
              :data-source="filterData" 
              :lable-width="100"></x-filter>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const filterState = ref({})
        const filterData = ref([{
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
                options: [
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                ],
            },
        ])

        return {
            filterState,
            filterData
        }
    }
}
</script>
```

## API

### Filter

#### Props

| 名称               | 说明                                                                           | 类型        | 默认值               |
|------------------|------------------------------------------------------------------------------|-----------|-------------------|
| v-model          | 当前输入值                                                                        | `array`   | -                 |
| dataSource       | 数据数组，具体详见[下表](#datasource)                                                   | `array`   | -                 |
| colon            | 是否显示冒号                                                                       | `boolean` | `true`            |
| labelWidth       | label 标签宽度                                                                   | `number`  | `80`              |
| footer           | 底部内容 `确定` `重置` 按钮                                                            | `boolean` | `false`           |
| okText           | 确认按钮文字                                                                       | `string`  | `确定`              |
| okType           | 确认按钮类型，可选：`primary`、`ghost`、`dashed`、`link`、`text`、`default`                 | `string`  | `primary`         |
| okButtonProps    | 确认按钮 `props`，具体详见：[AntDesignVue](https://antdv.com/components/button-cn#API) | `object`  | `{ ghost: true }` |
| resetText        | 重置按钮文字                                                                       | `string`  | `重置`              |
| resetType        | 重置按钮类型，可选：`primary`、`ghost`、`dashed`、`link`、`text`、`default`                 | `string`  | `default`         |
| resetButtonProps | 重置按钮 `props`，具体详见：[AntDesignVue](https://antdv.com/components/button-cn#API) | `object`  |                   |
| size             | 尺寸，可选：`default`、`small`                                                      | `string`  | `default`         |

#### Slots

| 名称       | 说明      | 返回值                             |
|----------|---------|---------------------------------|
| default  | 自定义内容   | -                               |
| footer   | 自定义底部内容 | -                               |
| collapse | 自定义折叠按钮 | `v-slot:collapse="{collapsed}"` |

---

### FilterItem

#### Props

| 名称         | 说明                       | 类型                                 | 默认值  |
|------------|--------------------------|------------------------------------|------|
| dataSource | 数据，具体项见[下表](#datasource) | `object`、`array`、`string`、`number` | -    |
| labelWidth | label 标签宽度               | `number`                           | `80` |
| label      | label 标签内容               | `string`                           | -    |

#### Slots

| 名称       | 说明      | 返回值                             |
|----------|---------|---------------------------------|
| default  | 自定义内容   | -                               |
| label    | 自定义标签   | -                               |
| collapse | 自定义折叠按钮 | `v-slot:collapse="{collapsed}"` |

#### DataSource

| 名称          | 说明                         | 类型        | 默认值     |
|-------------|----------------------------|-----------|---------|
| label       | 名称；必填                      | `string`  | -       |
| key         | 唯一索引；必填                    | `string`  | -       |
| multiple    | 多选                         | `boolean` | -       |
| allowClear  | 是否可以清除；`multiple=false` 有效 | `boolean` | `false` |
| collapsible | 是否可以收起                     | `boolean` | `false` |
| collapsed   | 默认收起状态                     | `boolean` | `false` |
| options     | 选项列表，具体项见[下表](#option)     | `array`   | -       |

