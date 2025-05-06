# SendCode 发送验证码

## 代码演示

### 基础用法

<<< @/../src/views/components/send-code/components/Basic.vue#snippet

### 重置

<<< @/../src/views/components/send-code/components/Reset.vue#snippet

### 自定义

<<< @/../src/views/components/send-code/components/Custom.vue#snippet

## API

### Props

| 参数               | 说明     | 类型     | 默认值 |
| ------------------ | -------- | -------- | ------ |
| seconds（v-model） | 计时时长 | `number` | `60`   |

### Events

| 事件名 | 说明         | 回调参数          |
| ------ | ------------ | ----------------- |
| change | 计时发生改变 | `seconds: number` |
| start  | 计时开始     | -                 |
| end    | 计时结束     | -                 |
| reset  | 重置计时     | -                 |

### Methods

通过 ref 可以获取到 SendCode 实例并调用实例方法。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| start  | 开始计时 | -    | -      |
| reset  | 重置     | -    | -      |

### Slots

| 名称    | 说明     | 参数                                                     |
| ------- | -------- | -------------------------------------------------------- |
| default | 默认插槽 | `{seconds: number, running: boolean, disabled: boolean}` |
