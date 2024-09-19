# Toolbar 工具条

## 代码演示

### 基础用法

<<< @/../src/views/components/toolbar/components/Basic.vue#snippet

### 带边框

<<< @/../src/views/components/toolbar/components/Bordered.vue#snippet

## API

### Props

| 名称<img width="110"/> | 说明                           | 类型        | 默认值    |
|----------------------|------------------------------|-----------|--------|
| bordered             | 是否显示边框，显示边框时将会使用 `Card` 组件包裹 | `boolean` | `true` |

### Slots

| 名称      | 说明         |
|---------|------------|
| default | 内容         |
| extra   | 扩展内容，显示在右侧 |
