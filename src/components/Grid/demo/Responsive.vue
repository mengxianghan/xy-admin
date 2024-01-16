<demo>
## 响应式栅格项
响应式栅格项
</demo>

<template>
    <x-grid :gutter="[12, 12]">
        <x-grid-item
            v-for="(item, index) in 6"
            :key="item"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
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
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}
</style>
