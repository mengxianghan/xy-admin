# QRCode 二维码

## 代码演示

### 基础用法

<<< @/../src/components/QRCode/demo/Basic.vue#snippet

### 带 Icon

<<< @/../src/components/QRCode/demo/Icon.vue#snippet

### 不同的状态

<<< @/../src/components/QRCode/demo/Status.vue#snippet

### 自定义尺寸

<<< @/../src/components/QRCode/demo/Size.vue#snippet

### 自定义颜色

<<< @/../src/components/QRCode/demo/Color.vue#snippet

### 下载二维码

<<< @/../src/components/QRCode/demo/Download.vue#snippet

### 纠错比例

<<< @/../src/components/QRCode/demo/Error.vue#snippet

### 高级用法

<<< @/../src/components/QRCode/demo/Popover.vue#snippet

## API

### Props

| 名称<img width="160"/>  | 说明                                                    | 类型        | 默认值       |
|-----------------------|-------------------------------------------------------|-----------|-----------|
| value                 | 二维码内容                                                 | `string`  | -         |
| bordered              | 边框                                                    | `boolean` | `true`    |
| size                  | 大小                                                    | `number`  | `160`     |
| color                 | 颜色                                                    | `string`  | `#000000` |
| background-color      | 背景色                                                   | `string`  | `#ffffff` |
| icon                  | icon url                                              | `string`  | -         |
| icon-size             | icon 尺寸                                               | `number`  | `40`      |
| icon-padding          | icon 内间距                                              | `number`  | `0`       |
| icon-background-color | icon 背景色                                              | `string`  | -         |
| error-level           | 容错级别，可选：【L=low, M=medium, Q=quartile, H=high】         | `string`  | `M`       |
| status                | 状态，可选：【active=有效，loading=加载中，expired=已过期，scanned=已扫描】 | `string`  | `active`  |
| margin                | 安全区宽度                                                 | `number`  | `12`      |

### Events

| 事件名         | 说明      | 回调参数       |
|-------------|---------|------------|
| initialized | 初始化     | `instance` |
| refresh     | 点击刷新的回调 | -          |

### Methods

| 名称        | 说明          | 返回值       |
|-----------|-------------|-----------|
| toDataURL | 获取 data URI | `Promise` |
