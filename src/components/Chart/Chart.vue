<template>
    <div
        ref="chartRef"
        class="x-chart"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { markRaw, onBeforeMount, onMounted, ref, watch } from 'vue'

defineOptions({
    name: 'XChart',
})

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

const emit = defineEmits(['init'])

const chart = ref(null)
const chartRef = ref()

watch(
    () => props.options,
    () => init(),
    {
        deep: true,
    }
)

onMounted(() => {
    init()
})

onBeforeMount(() => {
    if (!chart.value) return
    chart.value.dispose()
})

/**
 * 初始化
 * @private
 */
function init() {
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
        emit('init', chart.value)
    }, 100)
}
</script>

<style lang="less" scoped>
.x-chart {
    width: 100%;
    height: 100%;
}
</style>
