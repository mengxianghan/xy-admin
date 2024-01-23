<demo>
## 响应式列数
响应式列数
</demo>

<template>
    <x-grid
        :columns="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
        :gutter="[12, 12]">
        <x-grid-item
            v-for="(item, index) in 6"
            :key="item">
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
