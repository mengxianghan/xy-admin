# QrCode 二维码

## 示例

### 基础用法

```vue
<template>
    <x-qr-code value="XYAdmin"></x-qr-code>
</template>

<script setup>
</script>
```

### 带 Icon

```vue
<template>
    <x-qr-code value="XYAdmin" :icon="ICON_URL"></x-qr-code>
</template>

<script setup>
import ICON_URL from '@/assets/logo.svg'
</script>
```

### 不同的状态

```vue
<template>
    <a-row :gutter="24">
        <a-col>
            <x-qr-code value="XYAdmin"
                       status="loading"></x-qr-code>
        </a-col>
        <a-col>
            <x-qr-code value="XYAdmin"
                       status="expired"
                       @refresh="onRefresh"></x-qr-code>
        </a-col>
    </a-row>
</template>

<script setup>
import { message } from 'ant-design-vue';

function onRefresh() {
    message.success('点击了刷新');
}
</script>
```


### 自定义颜色

```vue
<template>
    <a-row :gutter="24">
        <a-col>
            <x-qr-code value="XYAdmin"
                       color="#73d13d"
                       background-color="#974ccd"></x-qr-code>
        </a-col>
        <a-col>
            <x-qr-code value="XYAdmin"
                       color="#1677ff"
                       background-color="#e89538"></x-qr-code>
        </a-col>
    </a-row>
</template>

<script setup>
</script>
```

```vue
<template>
    <x-qr-code value="XYAdmin"
               :icon="ICON_URL"
               :size="size"
               :icon-size="size/4"></x-qr-code>
    <a-button-group class="mt-8-2">
        <a-button @click="handleMinus">减小</a-button>
        <a-button @click="handlePlus">增大</a-button>
    </a-button-group>
</template>

<script setup>
import { ref } from 'vue'
import ICON_URL from '@/assets/logo.svg'

const size = ref(120)

function handleMinus() {
    size.value -= 10
    if (size.value < 48) {
        size.value = 48
    }
}

function handlePlus() {
    size.value += 10
    if (size.value > 300) {
        size.value = 300
    }
}
</script>
```

### 纠错等级

```vue
<template>
    <x-qr-code value="XYAdminXYAdminXYAdminXYAdminXYAdminXYAdminXYAdminXYAdmin" 
               :error-level="errorLevel"></x-qr-code>

    <a-radio-group v-model:value="errorLevel" class="mt-8-2">
        <a-radio-button value="M">M</a-radio-button>
        <a-radio-button value="L">L</a-radio-button>
        <a-radio-button value="Q">Q</a-radio-button>
        <a-radio-button value="H">H</a-radio-button>
    </a-radio-group>
</template>

<script setup>
const errorLevel = ref('M')
</script>
```


### 下载二维码

```vue
<template>
    <x-qr-code value="XYAdmin" ref="qrCodeRef"></x-qr-code>
    <a-button type="primary" ghost class="mt-8-2" @click="handleDownload">下载二维码</a-button>
</template>

<script setup>
import { ref } from 'vue'

const qrCodeRef = ref()

async function handleDownload(){
    const url = await qrCodeRef.value.toDataURL()
    const a = document.createElement('a')
    a.download = 'QRCode.png'
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
</script>
```

## API

### 参数

| 名称                  | 说明                                 | 类型       | 默认值           |
|---------------------|------------------------------------|----------|---------------|
| value               | 二维码内容，必填                           | `string` | `-`           |
| size                | 大小                                 | `number` | `120`         |
| color               | 颜色                                 | `string` | `#000000`     |
| backgroundColor     | 背景色                                | `string` | `#ffffff`     |
| icon                | icon url                           | `string` | -             |
| iconSize            | icon 尺寸                            | `number` | `30`          |
| iconPadding         | icon 内间距                           | `number` | `0`           |
| iconBackgroundColor | icon 背景色                           | `string` | `transparent` |
| errorLevel          | 容错级别，可选：`M` `L` `Q` `H`            | `string` | `M`           |
| status              | 状态，可选：`active` `loading` `expired` | `string` | `active`      |

### 事件

| 名称      | 说明          |
|---------|-------------|
| refresh | 点击"点击刷新"的回调 |

### 方法

| 名称        | 说明          | 返回值       |
|-----------|-------------|-----------|
| toDataURL | 获取 data URI | `Promise` |