<demo>
## 基本用法
这是基本用法，它也只有基本用法。发挥你的想象，创造出更多的使用场景
</demo>

<template>
    <div>
        <x-action-bar>
            <a-button type="primary">新建数据</a-button>

            <template #extra>
                <a-space>
                    <a-input></a-input>
                    <a-button
                        type="primary"
                        ghost>
                        查询
                    </a-button>
                </a-space>
            </template>
        </x-action-bar>
    </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
