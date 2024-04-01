# Chart 图表

## 代码演示

### 折线图
<<< @/../src/views/components/chart/components/LineChart.vue#snippet

### 柱状图
<<< @/../src/views/components/chart/components/BarChart.vue#snippet

### 饼图
<<< @/../src/views/components/chart/components/PieChart.vue#snippet

### 雷达(属性)图
<<< @/../src/views/components/chart/components/RadarChart.vue#snippet

### K线图
<<< @/../src/views/components/chart/components/KlineChart.vue#snippet

### 仪表盘
<<< @/../src/views/components/chart/components/GaugeChart.vue#snippet
 
### 更多用法
:::tip 提示
1. 基于百度 ECharts 实现，更多使用方式请参考官方文档。[https://echarts.apache.org/zh/option.html](https://echarts.apache.org/zh/option.html)
2. 可根据实际业务场景自行扩展。详见：`/src/components/Chart.vue`
:::

## API

### Props

| 名称     | 说明                                                                 | 类型                | 默认值    |
|--------|--------------------------------------------------------------------|-------------------|--------|
| option | 配置信息，详见 [ECharts](https://echarts.apache.org/zh/option.html#title) | `object`          | `{}`   |
| width  | 宽                                                                  | `number` `string` | `auto` |
| height | 高                                                                  | `number` `string` | `auto` |

### Events

| 名称          | 说明    | 参数              |
|-------------|-------|-----------------|
| initialized | 初始化完成 | `chartInstance` |



