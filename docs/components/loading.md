# Loading 加载中

## 示例

### 基础用法
---
<a-button type="primary" ghost @click="handleShow">显示</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script>
import { loading } from '@/components'

export default {
    setup() {

        function handleShow() {
            loading()

            setTimeout(() => {
                loading.hide()
            }, 3000)
        }

        return {
            handleShow
        }
    }
}
</script>
```

:::

### 自定义内容
---
<a-button type="primary" ghost @click="handleCustom">显示</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script>
import { h } from 'vue';
import { loading } from '@/components';
import { Button } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';

export default {
    setup() {
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

        return {
            handleShow
        }
    }
}
</script>
```

:::

### 手动更新
---
<a-button type="primary" ghost @click="handleUpdate">显示</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handleShow">显示</a-button>
    </div>
</template>

<script>
import { loading } from '@/components';

export default {
    setup() {
        function handleShow() {
            const loading = loading({
                title: '倒计时 3 秒'
            });

            let second = 3;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    loading.setOption({
                        title: `倒计时 ${ second } 秒`
                    });
                } else {
                    clearInterval(timer);
                    loading.hide();
                }
            }, 1000);
        }

        return {
            handleShow
        }
    }
}
</script>
```

:::

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

<script setup>
import { h } from 'vue';
import { Button } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import loading from '@/components/Loading';

function handleShow(){
    loading();

    hide();
}

function handleCustom(){
    loading({
        icon: h(SmileOutlined),
        title: '自定义标题',
        subTitle: '正在努力加载',
        extra: h(Button, {
            onClick: ()=>{
                location.reload();
            }
        }, '刷新页面')
    });

    hide();
}

function handleUpdate(){
    const loading = loading({
        title: '倒计时 3 秒'
    });

    let second = 3;
    const timer = setInterval(() => {
        second--;
        if (second) {
            loading.setOption({
                title: `倒计时 ${second} 秒`
            });
        } else {
            clearInterval(timer);
            loading.hide();
        }
    }, 1000);
}

function hide(){
    setTimeout(()=>{
        loading.hide()
    }, 3000)
}
</script>
