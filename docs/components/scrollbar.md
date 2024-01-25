# Scrollbar 滚动条

## 代码演示

### 基础用法

<<< @/../src/components/Scrollbar/demo/Basic.vue#snippet

### 横向滚动

<<< @/../src/components/Scrollbar/demo/Horizontal.vue#snippet

### 最大高度

<<< @/../src/components/Scrollbar/demo/MaxHeight.vue#snippet

### 手动滚动

<<< @/../src/components/Scrollbar/demo/ScrollTo.vue#snippet

## API

### Props

| 参数<img width="80" /> | 说明                                              | 类型              | 默认值  |
|----------------------| ------------------------------------------------- | ----------------- | ------- |
| height               | 容器高度                                          | `number` `string` | `100%`  |
| max-height           | 最大高度                                          | `number` `string` | -       |
| always               | 是否一直显示滚动条，为 false 时，仅滑过容器时显示 | `boolean`         | `false` |

### Events

| 事件名      | 说明       | 回调参数          |
| ----------- | ---------- | ----------------- |
| scroll      | 滚动时     | `instance，event` |
| initialized | 初始化完成 | `instance`        |
| updated     | 内容更新时 | `instance`        |
| destroyed   | 销毁       | `instance`        |

:::tip 提示
`Scrollbar` 基于 `OverlayScrollbars` 进行扩展，更多用法详见：[OverlayScrollbars](https://github.com/KingSora/OverlayScrollbars)
:::
