# Chart 图表

## 示例

### 基本用法

```vue
<template>
    <x-chart :options="options" :height="320"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const options = ref({
    title: {
        text: 'Bar Demo',
        subtext: '基础柱状图',
    },
    grid: {
        top: '80px',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '15px',
        },
        {
            data: [110, 180, 120, 120, 60, 90, 110],
            type: 'bar',
            barWidth: '15px',
        },
    ],
})
</script>
```

### 动态更新

```vue
<template>
    <x-chart :options="options" :height="320" @ready="onReady"></x-chart>
</template>

<script setup>
import { ref } from 'vue'

const options = ref({
    title: {
        text: 'Bar Demo',
        subtext: '基础柱状图',
    },
    grid: {
        top: '80px',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '15px',
        },
        {
            data: [110, 180, 120, 120, 60, 90, 110],
            type: 'bar',
            barWidth: '15px',
        },
    ],
})

/**
 * 初始化完成
 * @param chart
 */
function onReady(chart) {
    setInterval(() => {
        chart.setOption({
            series: [
                {
                    data: getData(),
                },
                {
                    data: getData(),
                },
            ]
        })
    }, 1500);
}

/**
 * 生成随机数据
 * @returns {*[]}
 */
function getData() {
    const result = [];
    for (let i = 0; i < 7; i++) {
        result.push(random(50, 500))
    }
    return result;
}
</script>
```
 
### 更多用法
::: tip
1. 基于百度 ECharts 实现，更多使用方式请参考官方文档。[https://echarts.apache.org/zh/option.html](https://echarts.apache.org/zh/option.html)
2. 可根据实际业务场景自行扩展。详见：`/src/components/Chart.vue`
:::

## API

### 参数

| 名称      | 说明                                                                 | 类型                | 默认值    |
|---------|--------------------------------------------------------------------|-------------------|--------|
| options | 配置信息，详见 [ECharts](https://echarts.apache.org/zh/option.html#title) | `object`          | `{}`   |
| width   | 宽                                                                  | `number` `string` | `auto` |
| height  | 高                                                                  | `number` `string` | `auto` |

### 事件

| 名称    | 说明    | 参数                |
|-------|-------|-------------------|
| ready | 初始化完成 | `function(chart)` |



