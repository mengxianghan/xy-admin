# QrCode 二维码

## 示例

### 基础用法
---
<x-qr-code value="XYAdmin"></x-qr-code>

::: details 代码示例

```vue

<template>
    <x-qr-code value="XYAdmin"></x-qr-code>
</template>

<script>
export default {
    setup() {
        return {}
    }
}
</script>
```

:::

### 带 Icon
---
<x-qr-code value="XYAdmin" :icon="ICON_URL"></x-qr-code>

::: details 代码示例

```vue

<template>
    <x-qr-code value="XYAdmin" :icon="ICON_URL"></x-qr-code>
</template>

<script>
import ICON_URL from '@/assets/logo.svg';

export default {
    setup() {
        return {
            ICON_URL
        }
    }
}
</script>
```

:::

### 不同的状态
---
<a-row :gutter="24">
    <a-col>
        <x-qr-code value="XYAdmin" status="loading"></x-qr-code>
    </a-col>
    <a-col>
        <x-qr-code value="XYAdmin" status="expired" @refresh="onRefresh"></x-qr-code>
    </a-col>
</a-row>

::: details 代码示例

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

<script>
import { message } from 'ant-design-vue';

export default {
    setup() {
        function onRefresh() {
            message.success('点击了刷新');
        }

        return {
            onRefresh
        }
    }
}
</script>
```

:::

### 自定义颜色
---
<a-row :gutter="24">
    <a-col>
        <x-qr-code value="XYAdmin" color="#73d13d" background-color="#974ccd"></x-qr-code>
    </a-col>
    <a-col>
        <x-qr-code value="XYAdmin" color="#1677ff" background-color="#e89538"></x-qr-code>
    </a-col>
</a-row>

::: details 代码示例

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

<script>
export default {
    setup() {
        return {}
    }
}
</script>
```

:::

### 自定义尺寸
---
<x-qr-code value="XYAdmin" :icon="ICON_URL" :size="size" :icon-size="size/4"></x-qr-code>
<a-button-group class="mt-8-2">
<a-button @click="handleMinus">减小</a-button>
<a-button @click="handlePlus">增大</a-button>
</a-button-group>

::: details 代码示例

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

<script>
import { ref } from 'vue';
import ICON_URL from '@/assets/logo.svg';

export default {
    setup() {
        const size = ref(120)

        function handleMinus() {
            size.value -= 10;
            if (size.value < 48) {
                size.value = 48;
            }
        }

        function handlePlus() {
            size.value += 10;
            if (size.value > 300) {
                size.value = 300;
            }
        }

        return {
            ICON_URL,
            size,
            handleMinus,
            handlePlus
        }
    }
}
</script>
```

:::

### 纠错等级
---
<x-qr-code value="XYAdminXYAdminXYAdminXYAdminXYAdminXYAdminXYAdminXYAdmin" :error-level="errorLevel"></x-qr-code>

<a-radio-group v-model:value="errorLevel" class="mt-8-2">
    <a-radio-button value="M">M</a-radio-button>
    <a-radio-button value="L">L</a-radio-button>
    <a-radio-button value="Q">Q</a-radio-button>
    <a-radio-button value="H">H</a-radio-button>
</a-radio-group>

::: details 代码示例

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

<script>
export default {
    setup() {
        const errorLevel = ref('M');
        
        return {
            errorLevel
        }
    }
}
</script>
```

:::

### 下载二维码
---
<x-qr-code value="XYAdmin" ref="qrCodeRef"></x-qr-code>
<a-button type="primary" ghost class="mt-8-2" @click="handleDownload">下载二维码</a-button>

::: details 代码示例

```vue

<template>
    <x-qr-code value="XYAdmin" ref="qrCodeRef"></x-qr-code>
    <a-button type="primary" ghost class="mt-8-2" @click="handleDownload">下载二维码</a-button>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const qrCodeRef = ref()
        
        async function handleDownload(){
            const url = await qrCodeRef.value.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        return {
            handleDownload
        }
    }
}
</script>
```

:::

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

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import ICON_URL from '@/assets/logo.svg';

const text = ref('XYAdmin');
const qrCodeRef = ref();
const size = ref(120);
const errorLevel = ref('M');

function onRefresh(){
    message.success('点击了刷新');
}

function handleMinus(){
    size.value -= 10;
    if(size.value < 48){
        size.value = 48;
    }
}

function handlePlus(){
    size.value += 10;
    if (size.value > 300) {
        size.value = 300;
    }
}

async function handleDownload(){
    const url = await qrCodeRef.value.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
</script>