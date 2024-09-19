# Tree 树形控件 <Badge type="tip" text="^2.10.0" />

## 代码演示

### 基础用法

<<< @/../src/views/components/tree/components/Basic.vue#snippet

### 节点过滤

<<< @/../src/views/components/tree/components/Filter.vue#snippet

## API

### Props

| 参数<img width="140" /> | 说明                                                                   | 类型        | 默认值    |
|-----------------------|----------------------------------------------------------------------|-----------|--------|
| tree-data             | 数据源，与 `Ant Design Vue` 保持一致                                          | `array`   | -      |
| default-expand-all    | 默认展开所有树节点，为了解决 `Ant Design Vue` 树组件中需要重新实例化才能展开，在这里进行的拓展             | `boolean` | `true` |
| switcher              | 显示树节点的展开/折叠图标                                                        | `boolean` | `true` |
| filter-method         | 按需筛选树节点，返回 `true`                                                    | `boolean` | -      |
| keep-child-nodes      | 保留子节点，配合 `filter-method` 使用，设置为 `true` 时，筛选后的数据中不移除子节点（即便子节点不符合匹配条件） | `boolean` | `true` |

:::tip
其他属性请参考 [Ant Design Vue](https://www.antdv.com/components/tree-cn#api)
:::
