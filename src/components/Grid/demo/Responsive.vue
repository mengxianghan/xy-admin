<demo>
## 响应式栅格项
响应式栅格项
</demo>

<!-- #region snippet -->
<template>
    <x-grid :gutter="[12, 12]">
        <x-grid-item
            v-for="(item, index) in 6"
            :key="item"
            :lg="6"
            :md="8"
            :sm="12"
            :xl="4"
            :xs="24"
            :xxl="2">
            <div
                :class="{
                    'light-green': index % 2 === 1,
                    green: index % 2 === 0,
                }" />
        </x-grid-item>
    </x-grid>
</template>

<script setup>
import { GridItem as XGridItem } from '@/components'
</script>

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
