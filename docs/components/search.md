# Search 搜索

## 代码演示

### 基础用法

<<< @/../src/views/components/search/components/Basic.vue#snippet

### 折叠

<<< @/../src/views/components/search/components/Collapsed.vue#snippet

### 自定义配置

<<< @/../src/views/components/search/components/Custom.vue#snippet

## API

### Props

| 名称<img width="110"/> | 说明                                                                                 | 类型              | 默认值  |
| ---------------------- | ------------------------------------------------------------------------------------ | ----------------- | ------- |
| columns                | 显示的栅格数量                                                                       | `number` `Object` | `24`    |
| gutter                 | 栅格间隔，可以写成像素值设置水平间隔 。或者使用数组形式同时设置 [水平间距, 垂直间距] | `number` `array`  | `0`     |
| collapsed              | 是否默认折叠                                                                         | `boolean`         | `false` |
| collapsed-rows         | 默认展示的行数                                                                       | `number`          | `1`     |
| bordered               | 是否显示边框，显示边框时将会使用 `Card` 组件包裹                                     | `boolean`         | `true`  |

:::tip 提示
`Search` 组件基于 `AForm` 组件扩展，支持其所有参数。详见：[Form 组件](https://www.antdv.com/components/form-cn#api)
:::

### SearchItem Props

| 名称   | 说明                     | 类型      | 默认值  |
| ------ | ------------------------ | --------- | ------- |
| span   | 栅格占据的列数           | `number`  | `1`     |
| xs     | `<576px` 栅格占据的列数  | `number`  | -       |
| sm     | `≥576px` 栅格占据的列数  | `number`  | -       |
| md     | `≥768px` 栅格占据的列数  | `number`  | -       |
| lg     | `≥992px` 栅格占据的列数  | `number`  | -       |
| xl     | `≥1200px` 栅格占据的列数 | `number`  | -       |
| xxl    | `≥1600px` 栅格占据的列数 | `number`  | -       |
| offset | 栅格左侧的间隔格数       | `number`  | `0`     |
| suffix | 栅格后缀，只能存在一个   | `boolean` | `false` |

:::tip 提示
`SearchItem` 组件基于 `AFormItem`
组件扩展，支持其所有参数以及插槽。详见：[FormItem 组件](https://www.antdv.com/components/form-cn#form-item)
:::
