<demo>
## 带边框
圈（juàn）起来，更聚焦
</demo>

<!-- #region snippet -->
<template>
    <x-toolbar bordered>
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
