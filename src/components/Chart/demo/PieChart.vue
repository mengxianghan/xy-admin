<demo>
## 饼图
饼图
</demo>

<template>
    <x-chart
        :option="option"
        :height="300"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
    tooltip: {
        trigger: 'item',
    },
    legend: {
        top: 0,
        left: 'center',
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
        },
    ],
})
</script>

<style lang="less" scoped></style>
