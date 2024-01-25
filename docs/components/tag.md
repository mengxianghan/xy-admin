# Tag 标签

## 代码演示

### 基础用法

<<< @/../src/components/Tag/demo/Basic.vue#snippet

### 无边框

<<< @/../src/components/Tag/demo/Bordered.vue#snippet

### 可关闭

<<< @/../src/components/Tag/demo/Closeable.vue#snippet

### 形状

<<< @/../src/components/Tag/demo/Shape.vue#snippet

### 颜色

<<< @/../src/components/Tag/demo/Color.vue#snippet

### 次要标签

<<< @/../src/components/Tag/demo/Secondary.vue#snippet

## API

### Props

| 参数<img width="100" /> | 说明                                                            | 类型      | 默认值    |
| ----------------------- | --------------------------------------------------------------- | --------- | --------- |
| type                    | 按钮类型，可选：default、primary、info、success、warning、error | `string`  | `default` |
| color                   | 颜色                                                            | `string`  | -         |
| text-color              | 文本颜色                                                        | `string`  | -         |
| border-color            | 边框颜色                                                        | `string`  | -         |
| icon                    | 图标                                                            | `VNode`   | -         |
| secondary               | 次要标签                                                        | `boolean` | `false`   |
| bordered                | 是否显示边框                                                    | `boolean` | `true`    |
| round                   | 是否圆形标签                                                    | `boolean` | `false`   |

### Slots

| 名层 | 说明 |
| ---- | ---- |
| icon | 图标 |
