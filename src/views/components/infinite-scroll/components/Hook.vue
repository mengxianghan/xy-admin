<demo>
## 使用 hooks
使用 hooks
</demo>

<!-- #region snippet -->
<template>
    <div
        ref="infiniteRef"
        class="infinite">
        <div
            v-for="item in count"
            :key="item"
            class="infinite-item">
            {{ item }}
        </div>
        <div
            class="align-center color-placeholder"
            @click="loadData">
            {{ statusText }}
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useInfiniteScroll } from '@/components/InfiniteScroll'

const infiniteRef = ref()
const count = ref(0)

const { initInfiniteScroll, showLoading, hideLoading, showFinished, statusText } = useInfiniteScroll()

onMounted(() => {
    initInfiniteScroll(infiniteRef.value, {
        onLoad: () => {
            loadData()
        },
    })
})

function loadData() {
    showLoading()
    setTimeout(() => {
        count.value += 10
        hideLoading()

        if (count.value >= 40) {
            showFinished()
        }
    }, 1000)
}
</script>

<style lang="less" scoped>
.infinite {
    height: 400px;
    overflow: auto;
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
<!-- #endregion snippet -->
