# Transfer 穿梭框

## 代码演示

### 基础用法

<<< @/../src/views/components/transfer/components/Basic.vue#snippet

### 自定义渲染行

<<< @/../src/views/components/transfer/components/CustomItem.vue#snippet

### 异步数据加载

<<< @/../src/views/components/transfer/components/Dynamic.vue#snippet

## API

### Props

| 参数<img width="180"/>   | 说明                                                                        | 类型         | 默认值                                                        |
|------------------------|---------------------------------------------------------------------------|------------|------------------------------------------------------------|
| selected-keys(v-model) | 显示在右侧框数据的 `key` 集合                                                        | `array`    | `[]`                                                       |
| data-source            | 数据源，非异步加载数据时，其中的部分数据将会被渲染到左边一栏中                                           | `array`    | `[]`                                                       |
| selected-rows(v-model) | 选中行，配合 `loadData` 使用。异步加载数据时需要手动回填数据                                      | `array`    | `[]`                                                       |
| field-names            | 自定义节点 label、value、children 的字段                                            | `object`   | `{ label: 'label', value: 'value', children: 'children' }` |
| clear-text             | 清除按钮文本                                                                    | `string`   | `清除`                                                       |
| placeholder            | 搜索框展位文本                                                                   | `string`   | -                                                          |
| show-search            | 显示搜索                                                                      | `boolean`  | `true`                                                     |
| show-check-all         | 显示全选                                                                      | `boolean`  | `false`                                                    |
| filter-option          | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false` | `function` | -                                                          |
| locale                 | 各种语言                                                                      | `object`   | `{ emptyText: '暂无数据' }`                                    |
| loadData               | 动态加载数据函数                                                                  | `function` | -                                                          |

### DataSourceType

| 参数<img width="180"/> | 说明                          | 类型                | 默认值     |
|----------------------|-----------------------------|-------------------|---------|
| label                | 标题                          | `string` `number` | -       |
| value                | 唯一标识                        | `string` `number` | -       |
| disabled             | 禁用                          | `boolean`         | `false` |
| checkable            | 允许选择                        | `boolean`         | `true`  |
| children             | 子节点                         | `array`           | -       |
| isLeaf               | 设置为叶子节点(设置了 `loadData` 时有效) | `boolean`         | `false` |

:::tip
`selected-rows` 结构与 `data-source` 结构一致
:::

### Events

| 事件名    | 说明      | 回调参数         |
|--------|---------|--------------|
| change | 选中项发生改变 | `modelValue` |

### Slots

| 名称   | 说明 |
|------|----|
| item | 选项 |
