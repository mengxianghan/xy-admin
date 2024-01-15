<template>
    <x-demo-box-group
        :components="[LineChart, BarChart, PieChart, RadarChart, KlineChart, GaugeChart]"></x-demo-box-group>
</template>

<script setup>
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import RadarChart from './RadarChart.vue'
import KlineChart from './KlineChart.vue'
import GaugeChart from './GaugeChart.vue'
</script>

<style lang="less" scoped></style>
