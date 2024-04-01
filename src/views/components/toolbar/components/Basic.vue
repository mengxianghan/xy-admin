<demo>
## 基础用法
用 `Row` 实现更方便，因为它也是基于 `Row` 扩展的
</demo>

<!-- #region snippet -->
<template>
    <x-toolbar>
        <a-button type="primary">新建数据</a-button>

        <template #extra>
            <a-space>
                <a-input></a-input>
                <a-button
                    ghost
                    type="primary">
                    查询
                </a-button>
            </a-space>
        </template>
    </x-toolbar>
</template>

<script setup></script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
