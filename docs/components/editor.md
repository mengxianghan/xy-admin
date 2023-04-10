# Editor 富文本编辑器

## API

### Props

| 名称                  | 说明   | 类型        | 默认值     |
|---------------------|------|-----------|---------|
| modelValue(v-model) | 内容   | `string`  | -       |
| options             | 配置   | `object`  | `{}`    |
| height              | 高    | `number`  | `300`   |
| placeholder         | 占位文本 | `string`  | -       |
| disabled            | 禁用   | `boolean` | `false` |

### Events

| 名称    | 说明    | 返回值                |
|-------|-------|--------------------|
| ready | 初始化完成 | `function(editor)` |
