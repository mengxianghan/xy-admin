<demo>
## K线图
K线图
</demo>

<template>
    <x-chart
        :option="option"
        :height="300"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
    grid: {
        left: '48px',
        right: '32px',
        top: '8px',
        bottom: '24px',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
        },
    },
    xAxis: {
        data: [
            '2017-10-23',
            '2017-10-24',
            '2017-10-25',
            '2017-10-26',
            '2017-10-27',
            '2017-10-28',
            '2017-10-29',
            '2017-10-30',
        ],
    },
    yAxis: {
        scale: true,
    },
    series: [
        {
            type: 'k',
            data: [
                [2213.19, 2199.31, 2191.85, 2224.63],
                [2203.89, 2177.91, 2173.86, 2210.58],
                [2170.78, 2174.12, 2161.14, 2179.65],
                [2179.05, 2205.5, 2179.05, 2222.81],
                [2212.5, 2231.17, 2212.5, 2236.07],
                [2227.86, 2235.57, 2219.44, 2240.26],
                [2242.39, 2246.3, 2235.42, 2255.21],
                [2246.96, 2232.97, 2221.38, 2247.86],
            ],
        },
    ],
})
</script>

<style lang="less" scoped></style>
