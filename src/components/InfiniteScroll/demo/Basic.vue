<demo>
## 基本用法
通过 `loading` 和 `finished` 两个变量控制加载状态，当组件滚动到底部时，会触发 `load` 事件并将 `loading` 设置成 `true`。此时可以发起异步操作并更新数据，数据更新完毕后，将 `loading` 设置成 `false` 即可。若数据已全部加载完毕，则直接将 `finished` 设置成 `true` 即可。
</demo>

<template>
    <x-infinite-scroll
        v-model:error="error"
        v-model:loading="loading"
        :finished="finished"
        class="infinite"
        @load="loadData">
        <div
            v-for="item in count"
            :key="item"
            class="infinite-item">
            {{ item }}
        </div>
    </x-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const loading = ref(false)
const finished = ref(false)
const error = ref(false)

function loadData() {
    loading.value = true
    setTimeout(() => {
        count.value += 10
        loading.value = false

        if (count.value >= 40) {
            finished.value = true
        }
    }, 1000)
}
</script>

<style lang="less" scoped>
.infinite {
    height: 400px;
}
.infinite-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: @control-item-bg-hover;
}
</style>
