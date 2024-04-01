# Tag 标签

## 代码演示

### 基础用法

<<< @/../src/views/components/tag/components/Basic.vue#snippet

### 无边框

<<< @/../src/views/components/tag/components/Bordered.vue#snippet

### 可关闭

<<< @/../src/views/components/tag/components/Closeable.vue#snippet

### 形状

<<< @/../src/views/components/tag/components/Shape.vue#snippet

### 颜色

<<< @/../src/views/components/tag/components/Color.vue#snippet

### 次要标签

<<< @/../src/views/components/tag/components/Secondary.vue#snippet

## API

### Props

| 参数<img width="100" /> | 说明                                                 | 类型        | 默认值       |
|-----------------------|----------------------------------------------------|-----------|-----------|
| type                  | 按钮类型，可选：default、primary、info、success、warning、error | `string`  | `default` |
| color                 | 颜色                                                 | `string`  | -         |
| text-color            | 文本颜色                                               | `string`  | -         |
| border-color          | 边框颜色                                               | `string`  | -         |
| icon                  | 图标                                                 | `VNode`   | -         |
| secondary             | 次要标签                                               | `boolean` | `false`   |
| bordered              | 是否显示边框                                             | `boolean` | `true`    |
| round                 | 是否圆形标签                                             | `boolean` | `false`   |

### Slots

| 名称   | 说明 |
|------|----|
| icon | 图标 |
