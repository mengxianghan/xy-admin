# Cropper 图片裁剪

## 代码演示

### 基础用法
<<< @/../src/views/components/cropper/components/Basic.vue#snippet

### 比例
<<< @/../src/views/components/cropper/components/Ratio.vue#snippet

### 文件类型
<<< @/../src/views/components/cropper/components/FileType.vue#snippet

### 弹窗中使用
<<< @/../src/views/components/cropper/components/Dialog.vue#snippet

## API

### Props

| 名称           | 说明                           | 类型       | 默认值   |
|--------------|------------------------------|----------|-------|
| src          | 图片地址                         | `string` | -     |
| aspect-ratio | 比例，例如：`0` `1/1` `4/3` `16/9` | `number` | `0`   |
| quality      | 输出质量，取值范围：`0-1`              | `number` | `1`   |
| type         | 图片类型，可选：jpg、png、gif          | `string` | `jpg` |

:::tip 提示
在弹窗中使用时，同样支持以上选项
:::

### Events

| 名称          | 说明       | 返回值                      |
|-------------|----------|--------------------------|
| initialized | 初始化完成    | `cropper`                |
| change      | 裁剪尺寸发生变化 | `{ base64, blob, file }` |

### Actions

| 名称        | 说明            | 返回值       |
|-----------|---------------|-----------|
| getBase64 | 获取 base64 字符串 | `Promise` |
| getFile   | 获取 File 对象    | `Promise` |
| getBlob   | 获取二进制对象       | `Promise` |

::: tip 提示 
基于 `cropperjs` 实现，更多参数：[https://www.npmjs.com/package/cropperjs](https://www.npmjs.com/package/cropperjs)。

可根据实际业务进行扩展。详见：`/src/components/Cropper.vue`。
:::

::: warning 警告
`Cropper` 被 `CropperDialog` 、 `UploadImage` 引用 ，自行扩展后请检查相关组件可用性
:::
