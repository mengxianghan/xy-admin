# Loading 加载中

## 示例

### 基础用法

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script setup>
import { loading } from '@/components'

function handleShow() {
    loading()

    setTimeout(() => {
        loading.hide()
    }, 3000)
}
</script>
```

### 自定义内容

```vue
<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script setup>
import { h } from 'vue';
import { loading } from '@/components';
import { Button } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';

function handleShow() {
    loading({
        icon: h(SmileOutlined),
        title: '自定义标题',
        subTitle: '正在努力加载',
        extra: h(Button, {
            onClick: () => {
                location.reload();
            }
        }, '刷新页面')
    });

    setTimeout(() => {
        loading.hide()
    }, 3000)
}
</script>
```

### 手动更新

```vue
<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script setup>
import { loading } from '@/components';

function handleShow() {
    const instance = loading({
        title: '倒计时 3 秒'
    });

    let second = 3;
    const timer = setInterval(() => {
        second--;
        if (second) {
            instance.setOption({
                title: `倒计时 ${ second } 秒`
            });
        } else {
            clearInterval(timer);
            instance.hide();
        }
    }, 1000);
}
</script>
```

## API

### 参数

| 名称       | 说明          | 类型               | 默认值       |
|----------|-------------|------------------|-----------|
| icon     | 图标          | `string` `VNode` | `loading` |
| title    | title 文字    | `string` `VNode` | `正在努力加载`  |
| subTitle | subTitle 文字 | `string` `VNode` | -         |
| extra    | 操作区         | `string` `VNode` | -         |

### 方法

| 名称        | 说明    | 参数                                 |
|-----------|-------|------------------------------------|
| setOption | 更新配置项 | `{ icon, title, subTitle, extra }` |

