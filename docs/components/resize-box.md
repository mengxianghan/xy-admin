# ResizeBox 伸缩框

## 代码演示

### 基础用法

<<< @/../src/views/components/resize-box/components/Basic.vue#snippet

### 受控的高宽

<<< @/../src/views/components/resize-box/components/Size.vue#snippet

## API

### Props

| 名称<img width="110"/> | 说明                                                       | 类型              | 默认值      |
| ---------------------- | ---------------------------------------------------------- | ----------------- | ----------- |
| width(v-model)         | 宽                                                         | `number`          | `-`         |
| height(v-model)        | 高                                                         | `number`          | `-`         |
| component              | 容器标签                                                   | `string`          | `div`       |
| min-width              | 最小宽度                                                   | `number` `string` | `100`       |
| min-height             | 最小高度                                                   | `number` `string` | `100`       |
| max-width              | 最大宽度                                                   | `number` `string` | `100%`      |
| max-height             | 最大高度                                                   | `number` `string` | `-`         |
| directions             | 可以进行拖拽的边，可选：['left', 'right', 'top', 'bottom'] | `array`           | `['right']` |
| disabled               | 禁用                                                       | `boolean`         | `false`     |

### Events

| 事件名      | 说明     | 返回值  |
| ----------- | -------- | ------- |
| movingStart | 拖拽开始 | `event` |
| moving      | 拖拽中   | `event` |
| movingEnd   | 拖拽结束 | `event` |
