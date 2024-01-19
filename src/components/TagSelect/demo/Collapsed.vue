<demo>
## 折叠
超过一行自动折叠
</demo>

<template>
    <a-space
        :size="24"
        direction="vertical">
        <x-tag-select
            v-model="selectedKeys"
            :options="options"></x-tag-select>
        <x-tag-select
            v-model="selectedKeys"
            :options="options">
            <template #collapse="{ collapsed }">
                <template v-if="collapsed">更多</template>
                <template v-else>收起</template>
            </template>
        </x-tag-select>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const options = ref([
    { label: '类目1', value: 1 },
    { label: '类目2', value: 2 },
    { label: '类目3', value: 3 },
    { label: '类目4', value: 4 },
    { label: '类目5', value: 5 },
    { label: '类目6', value: 6 },
    { label: '类目7', value: 7 },
    { label: '类目8', value: 8 },
    { label: '类目9', value: 9 },
    { label: '类目10', value: 10 },
    { label: '类目11', value: 11 },
    { label: '类目12', value: 12 },
    { label: '类目13', value: 13 },
    { label: '类目14', value: 14 },
    { label: '类目15', value: 15 },
    { label: '类目16', value: 16 },
    { label: '类目17', value: 17 },
    { label: '类目18', value: 18 },
    { label: '类目19', value: 19 },
    { label: '类目20', value: 20 },
])
const selectedKeys = ref([])
</script>

<style lang="less" scoped></style>
