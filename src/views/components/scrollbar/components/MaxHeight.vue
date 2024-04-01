<demo>
## 最大高度
当元素高度超过最大高度，才会显示滚动条。
</demo>

<!-- #region snippet -->
<template>
    <a-space :size="24">
        <a-button @click="handleAdd">Add Item</a-button>
        <a-button @click="handleDelete">Delete Item</a-button>
    </a-space>
    <x-scrollbar max-height="400px">
        <p
            v-for="item in count"
            :key="item"
            class="scrollbar-demo-item">
            {{ item }}
        </p>
    </x-scrollbar>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(3)

function handleAdd() {
    count.value++
}

function handleDelete() {
    if (count.value > 0) {
        count.value--
    }
}
</script>

<style lang="less" scoped>
.scrollbar-demo-item {
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
