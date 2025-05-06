<script setup>
import BarChart from './components/BarChart.vue'
import GaugeChart from './components/GaugeChart.vue'
import KlineChart from './components/KlineChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'
</script>

<template>
  <x-demo-box-group
    :components="[LineChart, BarChart, PieChart, RadarChart, KlineChart, GaugeChart]"
  />
</template>

<style lang="less" scoped></style>
