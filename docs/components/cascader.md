# Cascader 级联选择

:::tip
如果不需要通过接口获取下级数据时建议使用 AntDesign 中的 Cascader 组件
:::

## 示例

### 基础用法

```vue
<template>
    <x-cascader v-model:value="value"
                :load-data="loadData"></x-cascader>
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])

async function loadData(payload){
    const { level, value, selected } = payload || {}
    // TODO: 请求接口
    return apis.getDataList()
}
</script>
```

## API

### 参数

| 参数           | 说明                                                                                                                      | 类型                | 默认值                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------- |
| modelValue(v-model) | 内容                                                                                                                      | `array`             | `[]`                                                       |
| loadData       | 加载数据                                                                                                                  | `function`、`array` | -                                                          |
| maxLevel       | 最大层级，loadData 为 function 类型时可以用它来控制数据的最深层级；loadData 为 array 类型时，通过数组长度自动计算最多层级 | `number`            | `1`                                                        |
| filedNames     | 自定义 `options` 中 `label` `value` `children` 的字段                                                                     | `object`            | `{ label: 'label', value: 'value', children: 'children' }` |

### 事件

| 事件名 | 说明             | 返回值                           |
| ------ | ---------------- | -------------------------------- |
| change | 选择完成后的回调 | function(value, selectedOptions) |
