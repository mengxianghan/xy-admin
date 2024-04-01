<template>
    <x-demo-box-group
        :components="[LineChart, BarChart, PieChart, RadarChart, KlineChart, GaugeChart]"></x-demo-box-group>
</template>

<script setup>
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'
import KlineChart from './components/KlineChart.vue'
import GaugeChart from './components/GaugeChart.vue'
</script>

<style lang="less" scoped></style>
