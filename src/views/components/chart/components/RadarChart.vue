<demo>
## 雷达(属性)图
雷达(属性)图
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const option = ref({
  grid: {
    left: '32px',
    right: '32px',
    top: '8px',
    bottom: '24px',
  },
  tooltip: {
    trigger: 'item',
  },
  radar: {
    radius: 100,
    center: ['50%', '55%'],
    indicator: [
      { name: '销售', max: 100 },
      { name: '管理', max: 100 },
      { name: '信息技术', max: 100 },
      { name: '客服', max: 100 },
      { name: '研发', max: 100 },
      { name: '市场', max: 100 },
    ],
  },
  series: [
    {
      name: 'SCUI',
      type: 'radar',
      areaStyle: {},
      data: [
        {
          value: [74, 90, 95, 65, 80, 31],
        },
      ],
    },
  ],
})
</script>

<template>
  <x-chart
    :height="300"
    :option="option"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
