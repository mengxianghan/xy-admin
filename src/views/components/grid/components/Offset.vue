<demo>
## 偏移
使用 `offset` 可以将列向右侧偏。例如：`offset={1}` 将元素向右侧偏移了 1 个列（column）的宽度。
</demo>

<!-- #region snippet -->
<template>
    <x-grid
        :columns="4"
        :gutter="12">
        <x-grid-item :offset="1">
            <div class="light-green"></div>
        </x-grid-item>
        <x-grid-item :offset="1">
            <div class="green"></div>
        </x-grid-item>
    </x-grid>
</template>

<script setup></script>

<style lang="less" scoped>
.light-green {
    height: 108px;
    background-color: #e6f4ff;
}

.green {
    height: 108px;
    background-color: #bae0ff;
}
</style>
<!-- #endregion snippet -->
