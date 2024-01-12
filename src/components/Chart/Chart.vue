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

const props = defineProps({
    /**
     * 图表配置
     */
    option: {
        type: Object,
        default: () => ({}),
    },
    /**
     * 宽，默认：自动
     */
    width: {
        type: [Number, String],
        default: 'auto',
    },
    /**
     * 高，默认：自动
     */
    height: {
        type: [Number, String],
        default: 'auto',
    },
})

const emit = defineEmits(['initialized'])

const chart = ref(null)
const chartRef = ref()

watch(
    () => props.option,
    () => init(),
    {
        deep: true,
    }
)

onMounted(() => {
    init()

    window.addEventListener('resize', resize)
})

onBeforeMount(() => {
    if (!chart.value) return
    chart.value.dispose()

    window.removeEventListener('resize', resize)
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
        chart.value.setOption(props.option, true)
        resize()
        emit('initialized', chart.value)
    }, 100)
}

function resize() {
    if (!chart.value) return
    chart.value.resize()
}
</script>

<style lang="less" scoped>
.x-chart {
    width: 100%;
    height: 100%;
}
</style>
