# TableColumnSetting 列设置

## 代码演示

### 基础用法

<<< @/../src/views/components/table-column-setting/components/Basic.vue#snippet

### 自定义

<<< @/../src/views/components/table-column-setting/components/Custom.vue#snippet

### 动态列

<<< @/../src/views/components/table-column-setting/components/DynamicColumns.vue#snippet

## API

### Props

| 参数               | 说明 | 类型    | 默认值 |
| ------------------ | ---- | ------- | ------ |
| columns（v-model） | 列   | `array` | `[]`   |

### Events

| 事件名 | 说明       | 回调参数         |
| ------ | ---------- | ---------------- |
| change | 列发生改变 | `columns: array` |

### Methods

通过 ref 可以获取到 TableColumnSetting 实例并调用实例方法。

| 方法名 | 说明                         | 参数                       | 返回值 |
| ------ | ---------------------------- | -------------------------- | ------ |
| init   | 初始化，动态改变表格列时调用 | `column: array` 新的表格列 | -      |
