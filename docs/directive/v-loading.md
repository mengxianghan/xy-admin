# v-loading 加载

## 示例

### 基础用法

---

<a-alert 
    v-loading="loading"
    message="Alert message title"
    description="Further details about the context of this alert."></a-alert>
<a-space class="mt-8-2">
<a-button @click="handleShow">显示 loading</a-button>
<a-button @click="handleHide">隐藏 loading</a-button>
</a-space>

::: details 代码示例

```vue {3}
<template>
    <a-alert
        v-loading="loading"
        message="Alert message title"
        description="Further details about the context of this alert."></a-alert>
    <a-space class="mt-8-2">
        <a-button @click="handleShow">显示 loading</a-button>
        <a-button @click="handleHide">隐藏 loading</a-button>
    </a-space>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const loading = ref(false)

        function handleShow() {
            loading.value = true
        }

        function handleHide() {
            loading.value = false
        }

        return {
            loading,
            handleShow,
            handleHide,
        }
    },
}
</script>
```

:::

### 自定义标题

---

<a-alert
v-loading="loading"
x-loading-title="自定义标题"
message="Alert message title"
description="Further details about the context of this alert."></a-alert>
<a-space class="mt-8-2">
<a-button @click="handleShow">显示 loading</a-button>
<a-button @click="handleHide">隐藏 loading</a-button>
</a-space>

::: details 代码示例

```vue {3}
<template>
    <a-alert
        v-loading="loading"
        x-loading-title="自定义标题"
        message="Alert message title"
        description="Further details about the context of this alert."></a-alert>
    <a-space class="mt-8-2">
        <a-button @click="handleShow">显示 loading</a-button>
        <a-button @click="handleHide">隐藏 loading</a-button>
    </a-space>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const loading = ref(false)

        function handleShow() {
            loading.value = true
        }

        function handleHide() {
            loading.value = false
        }

        return {
            loading,
            handleShow,
            handleHide,
        }
    },
}
</script>
```

:::

<script setup>
import { ref } from 'vue';

const loading = ref(false);

function handleShow(){
    loading.value = true;
}

function handleHide(){
    loading.value = false;
}
</script>
