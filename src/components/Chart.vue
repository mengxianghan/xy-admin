<template>
    <div class="x-chart"
         ref="chart"></div>
</template>

<script>
export default {
    name: 'XChart',
    props: {
        option: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        }
    },
    computed: {},
    watch: {
        option() {
            this.init()
        }
    },
    created() {
        this.$once('hook:beforeDestroy', () => {
            if (this.chart) {
                this.chart.dispose()
                this.chart = null
            }
        })
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const {option} = this
            if (!option || !Object.keys(option).length) return
            this.$echarts.registerTheme('xchart', {
                legend: {
                    itemWidth: 14,
                    itemHeight: 14
                },
                bar: {
                    barWidth: 30,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    },
                    showBackground: true
                }
            })
            let chart = this.$echarts.init(this.$refs.chart, 'xchart')
            chart.setOption(option, true)
            setTimeout(() => {
                chart.setOption(option, true)
                chart.resize()
            })
            this.$emit('complete', chart)
            this.chart = chart
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-chart {
    height: 375px;
}
</style>
