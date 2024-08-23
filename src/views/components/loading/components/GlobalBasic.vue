<demo>
## 基础用法（全局）
最简单的使用方式，适应各种场景。
</demo>

<!-- #region snippet -->
<template>
    <a-button
        type="primary"
        @click="handleShow">
        显示
    </a-button>
</template>

<script setup>
import { Loading } from '@/components'

defineOptions({
    name: 'GlobalBasic',
})

function handleShow() {
    Loading()

    setTimeout(() => {
        Loading.destroy()
    }, 2000)
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
