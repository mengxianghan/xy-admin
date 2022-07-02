<template>
    <div class="x-chart"
         ref="chartRef"></div>
</template>

<script>
import { onMounted, ref, toRefs, markRaw, watch } from 'vue'

import * as echarts from 'echarts'

/**
 * @property {object} options 配置信息
 * @property {number | string} width 宽 
 * @property {number | string} height 高
 */
export default {
    name: 'XChart',
    props: {
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
    },
    emits: ['ready'],
    setup(props, { emit }) {
        const { options, width, height } = toRefs(props)
        const chart = ref(null)
        const chartRef = ref()

        watch(() => options.value, () => _init())

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

            chart.value = markRaw(echarts.init(chartRef.value, 'chart', {
                width: width.value,
                height: height.value,
            }))

            setTimeout(() => {
                chart.value.setOption(options.value, true)
                chart.value.resize()
            }, 100)

            emit('ready', chart.value)
        }

        return {
            chartRef,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-chart {
    width: 100%;
    height: 100%;
}
</style>
