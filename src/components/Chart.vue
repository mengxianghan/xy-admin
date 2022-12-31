<template>
    <div
        class="x-chart"
        ref="chartRef"></div>
</template>

<script>
export default {
    name: 'XChart',
}
</script>

<script setup>
import { onMounted, ref, markRaw, watch } from 'vue'

import * as echarts from 'echarts'

/**
 * 图表
 * @property {object} options 配置信息
 * @property {number | string} width 宽
 * @property {number | string} height 高
 */
const props = defineProps({
    options: {
        type: Object,
        default: () => ({}),
    },
    width: {
        type: [Number, String],
        default: 'auto',
    },
    height: {
        type: [Number, String],
        default: 'auto',
    },
})
const emit = defineEmits(['ready'])

const chart = ref(null)
const chartRef = ref()

watch(
    () => props.options,
    () => _init()
)

onMounted(() => {
    _init()
})

/**
 * 初始化
 * @private
 */
function _init() {
    echarts.registerTheme('chart', {
        legend: {
            itemWidth: 14,
            itemHeight: 14,
        },
        bar: {
            barWidth: 30,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
            },
            showBackground: true,
        },
    })

    chart.value = markRaw(
        echarts.init(chartRef.value, 'chart', {
            width: props.width,
            height: props.height,
        })
    )

    setTimeout(() => {
        chart.value.setOption(props.options, true)
        chart.value.resize()
    }, 100)

    emit('ready', chart.value)
}
</script>

<style lang="less" scoped>
.x-chart {
    width: 100%;
    height: 100%;
}
</style>
