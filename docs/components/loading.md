# Loading 加载

## 代码演示

### 基础用法

<<< @/../src/components/Loading/demo/GlobalBasic.vue#snippet

### 各种大小

<<< @/../src/components/Loading/demo/GlobalSize.vue#snippet

### 自定义

<<< @/../src/components/Loading/demo/GlobalCustom.vue#snippet

## API

### Props

| 名称<img width="120"/> | 说明                                                | 类型              | 默认值    |
|----------------------| --------------------------------------------------- | ----------------- | --------- |
| size                 | 大小，可选：【小：small，默认：default，大：large】 | `string` `VNode`  | `default` |
| icon                 | 自定义 icon                                         | `VNode`           | -         |
| description          | 描述文字                                            | `string` `VNode`  | -         |
| description-style    | 描述文字样式                                        | `string` `object` | -         |
| mask                 | 是否显示遮罩                                        | `boolean`         | `true`    |
| mask-style           | 遮罩样式                                            | `string` `object` | -         |
