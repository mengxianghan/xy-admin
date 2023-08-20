# ResizeBox 伸缩框

## 示例

### 基础用法

```vue
<template>
    <x-resize-box class="box" :directions="['right', 'bottom']">
        In the process of internal desktop applications development, many different design specs and implementations
        would be involved, which might cause designers and developers difficulties and duplication and reduce the
        efficiency of development. After massive project practice and summaries, Ant Design, a design language for
        background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for
        internal background projects, lower the unnecessary cost of design differences and implementation and
        liberate the resources of design and front-end development.
    </x-resize-box>
</template>

<script setup>
</script>

<style lang="less">
.box {
    border: @color-border solid 1px;
    padding: 16px;
}
</style>
```

### 受控的宽高

```vue
<template>
    <x-resize-box
        class="box"
        :directions="['right', 'bottom']"
        :min-width="100"
        v-model:width="width"
        v-model:height="height"
        @movingStart="onMovingStart"
        @moving="onMoving"
        @movingEnd="onMovingEnd">
        In the process of internal desktop applications development, many different design specs and implementations
        would be involved, which might cause designers and developers difficulties and duplication and reduce the
        efficiency of development. After massive project practice and summaries, Ant Design, a design language for
        background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for
        internal background projects, lower the unnecessary cost of design differences and implementation and
        liberate the resources of design and front-end development.
    </x-resize-box>

    <div class="mt-8-2">
        <div>状态：{{ status }}</div>
        <div>width：{{ width }}</div>
        <div>height：{{ height }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const status = ref('-')
const width = ref(500)
const height = ref(200)

function onMovingStart() {
    status.value = '开始拖动'
}

function onMoving() {
    status.value = '拖动中'
}

function onMovingEnd() {
    status.value = '拖动结束'
}
</script>

<style lang="less">
.box {
    border: @color-border solid 1px;
    padding: 16px;
}
</style>
```

## API

### 参数

| <div style="width: 140px">名称</div> | 说明                                        | 类型       | 默认值         |
|------------------------------------|-------------------------------------------|----------|-------------|
| width(v-model)                     | 内容                                        | `number` | `-`         |
| height(v-model)                    | 占位文本                                      | `number` | `-`         |
| minWidth                           | 最小宽度                                      | `number` | `-`         |
| minHeight                          | 最小高度                                      | `number` | `-`         |
| directions                         | 可以进行拖拽的边，可选：`left` `right` `top` `bottom` | `array`  | `['right']` |

### 事件

| 名称          | 说明   | 返回值               |
|-------------|------|-------------------|
| movingStart | 拖拽开始 | `function(event)` |
| moving      | 拖拽中  | `function(event)` |
| movingEnd   | 拖拽结束 | `function(event)` |
