# Editor 富文本编辑器

## 示例

### 基础用法

---
<template v-if="loaded">
    <x-editor v-model="content" :options="options"></x-editor>
</template>
<template v-else>
    <div class="align-center">
            加载中...
    </div>
</template>

::: details 代码示例

```vue

<template>
    <x-editor v-model="content"
              :options="options"></x-editor>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const content = ref('');

        const options = {
            height: 400
        }

        return {
            content,
            options
        }
    }
}
</script>
```

:::

### 更多用法

::: tip

基于 TinyMCE
实现，更多使用方式请参考官方文档。[https://www.tiny.cloud/docs/tinymce/6/basic-setup/](https://www.tiny.cloud/docs/tinymce/6/basic-setup/)

:::

## API

### 方法

| 名称                  | 说明   | 类型        | 默认值     |
|---------------------|------|-----------|---------|
| modelValue(v-model) | 内容   | `string`  | -       |
| options             | 配置   | `object`  | `{}`    |
| height              | 高    | `number`  | `300`   |
| placeholder         | 占位文本 | `string`  | -       |
| disabled            | 禁用   | `boolean` | `false` |

### 事件

| 名称    | 说明    | 返回值                |
|-------|-------|--------------------|
| ready | 初始化完成 | `function(editor)` |

<script setup>
import { ref, onMounted } from 'vue';

const content = ref('');
const loaded = ref(false);
const timer = ref(null);

const options = {
    height: 400
};

onMounted(()=>{
    init()
});

function init(){
    timer.value = setInterval(()=>{
        if(tinymce){
            loaded.value = true;
            if(timer.value){
                clearInterval(timer);
            }
        }
    }, 500);
}
</script>
