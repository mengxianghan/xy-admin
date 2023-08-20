# v-action 权限

权限自动从路由的 `meta.actions` 中获取

## 示例

### 基础用法

```vue {4,5,10,11}
<template>
    <h3>argument 方式</h3>
    <div>
        <x-action-button v-action:edit>编辑</x-action-button>
        <x-action-button v-action:delete>删除</x-action-button>
    </div>

    <h3>value 方式</h3>
    <div>
        <x-action-button v-action="'edit'">编辑</x-action-button>
        <x-action-button v-action="'delete'">删除</x-action-button>
    </div>
</template>

<script setup>
</script>
```

### 使用变量

```vue {3,4}
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

### 按钮组
两个权限都不存在时 `新增` 按钮被隐藏
```vue {3,10,11}
<template>
    <div>
        <a-dropdown v-action="['add:empty', 'add:tpl']">
            <a-button>
                新增
                <down-outlined></down-outlined>
            </a-button>
            <template #overlay>
                <a-menu>
                    <a-menu-item v-action="'add:empty'">新增空白文档</a-menu-item>
                    <a-menu-item v-action="'add:tpl'">从模板新增</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
</script>
```
