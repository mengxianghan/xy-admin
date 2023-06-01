<template>
    <a-list item-layout="horizontal">
        <a-list-item>
            <template #actions>
                <a-switch
                    v-model:checked="themeColor"
                    checked-children="黑色"
                    un-checked-children="白色"></a-switch>
            </template>
            <a-list-item-meta>
                <template #title>风格配色</template>
                <template #description>整体风格配色设置</template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <template #actions> </template>
            <a-list-item-meta>
                <template #title>主题色</template>
                <template #description>页面风格配色</template>
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'Custom',
})

const themeColor = ref(false)
</script>

<style lang="less" scoped></style>
