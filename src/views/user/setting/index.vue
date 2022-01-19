<template>
    <a-card :body-style="{paddingLeft:0, paddingRight:0}">
        <a-row type="flex">
            <a-col flex="0 0 224px">
                <a-menu v-model:selectedKeys="selectedKeys"
                        mode="inline">
                    <a-menu-item v-for="(item) in menuList"
                                 :key="item.key">{{ item.name }}
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col flex="auto"
                   class="px-8-5">
                <div class="setting-title">{{ title }}</div>
                <keep-alive>
                    <component :is="componentName"></component>
                </keep-alive>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import {computed, ref} from 'vue'
import {get, head, find} from 'lodash'

import Basic from './components/Basic'
import Safe from './components/Safe'
import Custom from './components/Custom'
import Bind from './components/Bind'
import Message from './components/Message'

export default {
    name: 'userSetting',
    components: {Basic, Safe, Custom, Bind, Message},
    setup() {
        const menuList = ref([
            {name: '基本设置', key: 'basic'},
            {name: '安全设置', key: 'safe'},
            {name: '个性化', key: 'custom'},
            {name: '账号绑定', key: 'bind'},
            {name: '新消息通知', key: 'message'},
        ])
        const selectedKeys = ref(['basic'])
        const componentName = computed(() => head(selectedKeys.value))
        const title = computed(() => get(find(menuList.value, {key: head(selectedKeys.value)}), 'name'))

        return {
            menuList,
            selectedKeys,
            componentName,
            title,
        }
    },
}
</script>

<style lang="less"
       scoped>
:deep(.setting-title) {
    font-size: 20px;
    color: @heading-color;
    margin-bottom: @margin-md;
}
</style>
