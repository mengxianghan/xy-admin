# Cascader 级联选择

:::tip 提示
如果不需要通过接口获取数据建议使用 `AntDesignVue` 中的自带的 `Cascader` 组件
:::

## 代码演示

### 基础用法

<<< @/../src/views/components/cascader/components/Basic.vue#snippet

### 高级用法

<<< @/../src/views/components/cascader/components/Advanced.vue#snippet

## API

### Props

| 参数<img width="150" /> | 说明                                                                             | 类型                 | 默认值                                                        |
|-----------------------|--------------------------------------------------------------------------------|--------------------|------------------------------------------------------------|
| model-value(v-model)  | 内容                                                                             | `array`            | `[]`                                                       |
| load-data             | 加载数据                                                                           | `function`、`array` | -                                                          |
| level                 | 最大层级，loadData 为 function 类型时可以用它来控制数据的最深层级；loadData 为 array 类型时，通过数组长度自动计算最多层级 | `number`           | `1`                                                        |
| field-names           | 自定义 `options` 中 `label` `value` `children` 的字段                                 | `object`           | `{ label: 'label', value: 'value', children: 'children' }` |

### Events

| 事件名    | 说明       | 回调参数                       |
|--------|----------|----------------------------|
| change | 选中项变化时触发 | `{value, selectedOptions}` |
