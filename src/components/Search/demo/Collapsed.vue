<demo>
## 折叠
实现高级搜索交互
</demo>

<template>
    <x-search
        :collapsed="collapsed"
        :collapsed-rows="1"
        :columns="3"
        :label-col="{ style: { width: '100px' } }">
        <x-search-item label="规则名称">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="描述">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="服务调用次数">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="状态">
            <a-select></a-select>
        </x-search-item>
        <x-search-item label="上次调度时间">
            <a-date-picker></a-date-picker>
        </x-search-item>
        <x-search-item suffix>
            <a-space>
                <a-button>重置</a-button>
                <a-button
                    ghost
                    type="primary">
                    查询
                </a-button>
                <a-typography-link @click="() => (collapsed = !collapsed)">
                    <template v-if="collapsed"
                        >展开
                        <down-outlined class="ml-4-1 fs-10"></down-outlined>
                    </template>
                    <template v-else
                        >收起
                        <up-outlined class="ml-4-1 fs-10"></up-outlined>
                    </template>
                </a-typography-link>
            </a-space>
        </x-search-item>
    </x-search>
</template>

<script setup>
import { ref } from 'vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

const collapsed = ref(true)
</script>

<style lang="less" scoped></style>
