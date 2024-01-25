# v-action 权限

权限自动从路由的 `meta.actions` 中获取

## 代码演示

### 基础用法

```vue
<template>
    <div>
        <x-action-button v-action="'edit'">编辑</x-action-button>
        <x-action-button v-action="'delete'">删除</x-action-button>
    </div>
</template>

<script setup></script>
```

### 使用变量

```vue
<template>
    <div>
        <x-action-button v-action="actionEdit">编辑</x-action-button>
        <x-action-button v-action="actionDelete">删除</x-action-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const actionEdit = ref('edit')
const actionDelete = ref('delete')
</script>
```

### 权限组

::: tip 应用场景
在多模块共用同一个页面时效果显著
:::

```vue
<template>
    <div>
        <!-- 两个权限都不存在时，按钮将隐藏 -->
        <a-dropdown v-action="['add:empty', 'add:template']">
            <a-button> 新增 </a-button>
            <template #overlay>
                <a-menu>
                    <a-menu-item v-action="'add:empty'">新增空白文档</a-menu-item>
                    <a-menu-item v-action="'add:template'">从模板新增</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup></script>
```

### 使用方法

```vue
<template>
    <div>
        <a-tabs>
            <!-- 独立引入方法 -->
            <a-tab-pane
                v-if="checkAction('tag1')"
                tab="标签1"
                key="1">
                标签1
            </a-tab-pane>
            <!-- 使用全局方法 -->
            <a-tab-pane
                v-if="$checkAction('tag2')"
                tab="标签2"
                key="2">
                标签2
            </a-tab-pane>
            <!-- 同样支持权限组 -->
            <a-tab-pane
                v-if="checkAction(['tag1', 'tag3'])"
                tab="标签3"
                key="3">
                标签3
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import { checkAction } from '@/directives/action'
</script>
```
