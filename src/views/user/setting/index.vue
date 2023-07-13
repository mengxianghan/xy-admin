<template>
    <a-card :body-style="{ paddingLeft: 0, paddingRight: 0 }">
        <a-row type="flex">
            <a-col flex="0 0 224px">
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    mode="inline">
                    <a-menu-item
                        v-for="item in menuList"
                        :key="item.key"
                        >{{ item.name }}
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col
                class="px-8-5"
                flex="auto">
                <div class="setting-title">{{ cpSelectedMenu.name }}</div>
                <keep-alive>
                    <component :is="cpSelectedMenu.component"></component>
                </keep-alive>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import { find, head } from 'lodash-es'
import { computed, markRaw, ref } from 'vue'

import Basic from './components/Basic.vue'
import Bind from './components/Bind.vue'
import Custom from './components/Custom.vue'
import Message from './components/Message.vue'
import Safe from './components/Safe.vue'

defineOptions({
    name: 'userSetting',
})

const menuList = ref([
    { name: '基本设置', key: 'basic', component: markRaw(Basic) },
    { name: '安全设置', key: 'safe', component: markRaw(Safe) },
    { name: '个性化', key: 'custom', component: markRaw(Custom) },
    { name: '账号绑定', key: 'bind', component: markRaw(Bind) },
    { name: '新消息通知', key: 'message', component: markRaw(Message) },
])
const selectedKeys = ref(['basic'])
const cpSelectedMenu = computed(() => find(menuList.value, { key: head(selectedKeys.value) }))
</script>

<style lang="less" scoped>
:deep(.setting-title) {
    font-size: 20px;
    color: @heading-color;
    margin-bottom: @margin-md;
}
</style>
