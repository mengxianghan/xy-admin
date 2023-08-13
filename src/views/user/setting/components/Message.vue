<template>
    <a-list
        item-layout="horizontal"
        row-key="id"
        :data-source="listData">
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a-switch
                        v-model:checked="item.checked"
                        checked-children="开"
                        un-checked-children="关"></a-switch>
                </template>
                <a-list-item-meta>
                    <template #title>{{ item.title }}</template>
                    <template #description>{{ item.description }}</template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'Message',
})

const listData = ref([
    { id: '1', title: '账户密码', description: '其他用户的消息将以站内信的形式通知', checked: true },
    { id: '2', title: '系统消息', description: '系统消息将以站内信的形式通知', checked: true },
    { id: '3', title: '待办任务', description: '待办任务将以站内信的形式通知', checked: true },
])
</script>

<style lang="less" scoped></style>
