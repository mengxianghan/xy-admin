# Transfer 穿梭框

## 代码演示

### 基础用法

<<< @/../src/components/Transfer/demo/Basic.vue#snippet

### 自定义渲染行

<<< @/../src/components/Transfer/demo/CustomItem.vue#snippet

### 异步数据加载

<<< @/../src/components/Transfer/demo/Dynamic.vue#snippet

## API

### Props

| 参数<img width="150"/> | 说明                                                                                               | 类型       | 默认值                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| model-value(v-model)   | 显示在右侧框数据的 `key` 集合                                                                      | `array`    | `[]`                                                       |
| data-source            | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。                              | `array`    | `[]`                                                       |
| target-source          |                                                                                                    | `array`    | `[]`                                                       |
| field-names            |                                                                                                    | `object`   | `{ label: 'label', value: 'value', children: 'children' }` |
| clear-text             | 清除按钮文本                                                                                       | `string`   | `清除`                                                     |
| placeholder            | 搜索框展位文本                                                                                     | `string`   | -                                                          |
| show-search            | 显示搜索                                                                                           | `boolean`  | `true`                                                     |
| show-check-all         | 显示全选                                                                                           | `boolean`  | `false`                                                    |
| filter-option          | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false` | `function` | -                                                          |
| locale                 | 各种语言                                                                                           | `object`   | `{ emptyText: '暂无数据' }`                                |
| loadData               | 动态加载数据函数                                                                                   | `function` | -                                                          |

### Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| change | 选中项发生改变 | `modelValue` |

### Slots

| 名称 | 说明 |
| ---- | ---- |
| item | 选项 |
