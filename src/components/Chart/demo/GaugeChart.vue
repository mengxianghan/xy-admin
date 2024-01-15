<demo>
## 仪表盘
仪表盘
</demo>

<template>
    <x-chart
        :option="option"
        :height="300"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
    series: [
        {
            center: ['50%', '60%'],
            type: 'gauge',
            anchor: {
                show: true,
                showAbove: true,
                size: 20,
                itemStyle: {
                    borderWidth: 5,
                },
            },
            progress: {
                show: true,
            },
            data: [
                {
                    value: 70,
                },
            ],
        },
    ],
})
</script>

<style lang="less" scoped></style>
