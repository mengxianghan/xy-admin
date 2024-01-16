<demo>
## 自定义配置
基于 `Form`、`FormItem` 组件封装，支持其所有属性和插槽
</demo>

<template>
    <x-search
        :label-col="{ style: { width: '100px' } }"
        :columns="3">
        <x-search-item>
            <template #label>
                规则名称
                <a-tooltip title="规则名称是唯一的 key">
                    <question-circle-outlined class="ml-4-1"></question-circle-outlined>
                </a-tooltip>
            </template>
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="状态">
            <a-input></a-input>
        </x-search-item>
        <x-search-item suffix>
            <a-space>
                <a-button>重置</a-button>
                <a-button
                    type="primary"
                    ghost>
                    查询
                </a-button>
            </a-space>
        </x-search-item>
    </x-search>
</template>

<script setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
</script>

<style lang="less" scoped></style>
