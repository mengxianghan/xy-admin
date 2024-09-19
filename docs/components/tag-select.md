# TagSelect 标签选择

## 代码演示

### 基础用法

<<< @/../src/views/components/tag-select/components/Basic.vue#snippet

### 多选

<<< @/../src/views/components/tag-select/components/Multiple.vue#snippet

### 不限

<<< @/../src/views/components/tag-select/components/Unlimited.vue#snippet

### 折叠

<<< @/../src/views/components/tag-select/components/Collapsed.vue#snippet

## API

### Props

| 参数<img width="150"/> | 说明      | 类型                        | 默认值                                 |
|----------------------|---------|---------------------------|-------------------------------------|
| model-value(v-model) |         | `string` `number` `array` | -                                   |
| multiple             | 是否多选    | `boolean`                 | `false`                             |
| options              | 选项      | `array`                   | `[]`                                |
| collapsible          | 是否可收起   | `boolean`                 | `true`                              |
| collapsed(v-model)   | 收起状态    | `boolean`                 | `true`                              |
| field-names          | 自定义节点字段 | `object`                  | `{ label: 'label', value: 'value'}` |

### Events

| 事件名      | 说明      | 回调参数                            |
|----------|---------|---------------------------------|
| collapse | 折叠发生改变  | `collapsed`                     |
| change   | 选中项发生改变 | `selectedKeys, selectedOptions` |

### Slots

| 名称       | 说明   |
|----------|------|
| option   | 选项   |
| collapse | 折叠按钮 |
