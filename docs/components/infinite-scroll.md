# InfiniteScroll 无限滚动

## 代码演示

### 基础用法

<<< @/../src/views/components/infinite-scroll/components/Basic.vue#snippet

### 错误提示

<<< @/../src/views/components/infinite-scroll/components/Error.vue#snippet

### 使用 hooks

<<< @/../src/views/components/infinite-scroll/components/Hook.vue#snippet

## API

### Props

| 名称<img width="120" /> | 说明                                                         | 类型      | 默认值                   |
| ----------------------- | ------------------------------------------------------------ | --------- | ------------------------ |
| loading(v-model)        | 是否处于加载状态，加载过程中不触发 `load` 事件               | `boolean` | `false`                  |
| error(v-model)          | 是否加载失败，加载失败后点击错误提示可以重新触发 `load` 事件 | `boolean` | `false`                  |
| loading-text            | 加载过程中的提示文案                                         | `string`  | `正在努力加载`           |
| finished                | 是否已加载完成，加载完成后不再触发 `load` 事件               | `boolean` | `false`                  |
| finished-text           | 加载完成后的提示文案                                         | `string`  | `没有更多了`             |
| error-text              | 加载失败后的提示文案                                         | `string`  | `加载失败，点击重新加载` |
| immediate-check         | 是否在初始化时立即执行滚动位置检查                           | `boolean` | `true`                   |
| distance                | 滚动条与底部距离小于 `distance` 时触发 `load` 事件           | `number`  | `30`                     |

### Events

| 事件名 | 说明                                   | 回调参数 |
| ------ | -------------------------------------- | -------- |
| load   | 滚动条与底部距离小于 `distance` 时触发 | -        |

### Slots

| 名称     | 说明                       |
| -------- | -------------------------- |
| default  | 列表内容                   |
| loading  | 自定义底部加载中提示       |
| finished | 自定义加载完成后的提示文案 |
| error    | 自定义加载失败后的提示文案 |
