# FilterTag 标签

配合 Filter 筛选组件使用

### Props

| 名称         | 说明                     | 类型                        | 默认值     |
|------------|------------------------|---------------------------|---------|
| v-model    | 当前输入值                  | `array`、`string`、`number` | -       |
| options    | 选项列表，具体项见[下表](#option) | `array`                   | -       |
| multiple   | 是否多选                   | `boolean`                 | `false` |
| allowClear | 是否允许取消                 | `boolean`                 | `false` |

### Slots

| 名称      | 说明    |
|---------|-------|
| default | 自定义内容 |

## FilterTagItem 标签项

### Props

| 名称    | 说明  | 类型                | 默认值 |
|-------|-----|-------------------|-----|
| value | 唯一值 | `string`、`number` | -   |

### Option

| 名称    | 说明   | 类型                | 默认值 |
|-------|------|-------------------|-----|
| label | 选项名称 | `string`          | -   |
| value | 选项值  | `string`、`number` | -   |

### Slots

| 名称      | 说明    |
|---------|-------|
| default | 自定义内容 |