<template>
    <a-alert type="info"
             show-icon>
        <template #message>鼠标放到 右/下 边框上可拖动改变尺寸</template>
    </a-alert>

    <a-card class="mt-8-2"
            title="基本用法"
            :bordered="false">
        <x-resize-box :directions="['right', 'bottom']">
            In the process of internal desktop applications development, many different design specs and
            implementations would be involved, which might cause designers and developers difficulties and
            duplication and reduce the efficiency of development.
            After massive project practice and summaries, Ant Design, a design language for background
            applications, is refined by Ant UED Team, which aims to uniform the user interface specs for
            internal background projects, lower the unnecessary cost of design differences and implementation
            and liberate the resources of design and front-end development.
        </x-resize-box>
    </a-card>
    <a-card class="mt-8-2"
            title="受控的高宽"
            :bordered="false">
        <x-resize-box :directions="['right', 'bottom']"
                      :style="{ minWidth: '100px', maxWidth: '100%', textAlign: 'center' }"
                      v-model:width="width"
                      v-model:height="height"
                      @movingStart="onMovingStart"
                      @moving="onMoving"
                      @movingEnd="onMovingEnd">
            In the process of internal desktop applications development, many different design specs and
            implementations would be involved, which might cause designers and developers difficulties and
            duplication and reduce the efficiency of development.
            After massive project practice and summaries, Ant Design, a design language for background
            applications, is refined by Ant UED Team, which aims to uniform the user interface specs for
            internal background projects, lower the unnecessary cost of design differences and implementation
            and liberate the resources of design and front-end development.
        </x-resize-box>
        <div class="mt-8-2">
            <p>状态：{{ status }}</p>
            <p>width：{{ width }}</p>
            <p>height：{{ height }}</p>
        </div>
    </a-card>
</template>

<script>
export default { name: 'componentResizebox' }
</script>

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

<style lang="less" scoped>
.x-resize-box {
    border: @border-color-base solid 1px;
    padding: 16px;
}
</style>