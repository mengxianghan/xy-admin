<demo>
## 折线图
折线图
</demo>

<template>
    <x-chart
        :height="300"
        :option="option"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
    grid: {
        left: '32px',
        right: '32px',
        top: '8px',
        bottom: '24px',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
        },
        {
            data: [110, 180, 120, 120, 60, 90, 110],
            type: 'line',
        },
    ],
})
</script>

<style lang="less" scoped></style>
