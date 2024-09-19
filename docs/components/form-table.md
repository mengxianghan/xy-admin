# FormTable 表单表格

## 代码演示

### 基础用法

<<< @/../src/views/components/form-table/components/Basic.vue#snippet

## API

### Props

| 名称                   | 说明          | 类型       | 默认值  |
|----------------------|-------------|----------|------|
| model-value(v-model) | 当前输入的值      | `array`  | `[]` |
| rowTpl               | 行模板，用于插入行使用 | `object` | `{}` |

### Events

| 名称     | 说明   | 返回值      |
|--------|------|----------|
| add    | 添加数据 | -        |
| delete | 删除数据 | `record` |
