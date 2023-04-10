# QrCode 二维码

## API

### Props

| 名称                   | 说明                          | 类型       | 默认值           |
|----------------------|-----------------------------|----------|---------------|
| text                 | 二维码内容，必填                    | `string` | -             |
| size                 | 尺寸                          | `number` | `100`         |
| logo                 | logo url                    | `string` | -             |
| logoSize             | logo 尺寸                     | `number` | `30`          |
| logoPadding          | logo 内间距                    | `number` | `5`           |
| logoBackgroundColor  | logo 背景色                    | `string` | `transparent` |
| colorDark            | 背景色                         | `string` | `#000000`     |
| colorLight           | 前景色                         | `string` | `#ffffff`     |
| errorCorrectionLevel | 容错级别，可选：`M`、`L`、`M`、`Q`、`H` | `string` | `M`           |
| margin               | 安静区宽度                       | `number` | `2`           |

### Events

| 名称    | 说明   | 返回值 |
|-------|------|-----|
| ready | 绘制完成 | -   |
