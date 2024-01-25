# Grid 网格

## 代码演示

### 基础用法

<<< @/../src/components/Grid/demo/Basic.vue#snippet

### 间隔

<<< @/../src/components/Grid/demo/Gutter.vue#snippet

### 偏移

<<< @/../src/components/Grid/demo/Offset.vue#snippet

### 响应式列数

<<< @/../src/components/Grid/demo/ResponsiveColumns.vue#snippet

### 响应式栅格项

<<< @/../src/components/Grid/demo/Responsive.vue#snippet

### 折叠

<<< @/../src/components/Grid/demo/Suffix.vue#snippet

## API

### Grid Props

| 名称<img width="110"/> | 说明                                            | 类型                | 默认值     |
|----------------------|-----------------------------------------------|-------------------|---------|
| columns              | 显示的栅格数量                                       | `number` `Object` | `24`    |
| gutter               | 栅格间隔，可以写成像素值设置水平间隔 。或者使用数组形式同时设置 [水平间距, 垂直间距] | `number` `array`  | `0`     |
| collapsed            | 是否默认折叠                                        | `boolean`         | `false` |
| collapsed-rows       | 默认展示的行数                                       | `number`          | `1`     |


### GridItem Props
| 名称     | 说明                | 类型        | 默认值     |
|--------|-------------------|-----------|---------|
| span   | 栅格占据的列数           | `number`  | `1`     |
| xs     | `<576px` 栅格占据的列数  | `number`  | -       |
| sm     | `≥576px` 栅格占据的列数  | `number`  | -       |
| md     | `≥768px` 栅格占据的列数  | `number`  | -       |
| lg     | `≥992px` 栅格占据的列数  | `number`  | -       |
| xl     | `≥1200px` 栅格占据的列数 | `number`  | -       |
| xxl    | `≥1600px` 栅格占据的列数 | `number`  | -       |
| offset | 栅格左侧的间隔格数         | `number`  | `0`     |
| suffix | 栅格后缀，只能存在一个       | `boolean` | `false` |
