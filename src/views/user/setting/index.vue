<template>
    <a-card :body-style="{paddingLeft:0, paddingRight:0}">
        <a-row type="flex"
               :gutter="40">
            <a-col flex="0 0 240px">
                <a-menu v-model:selectedKeys="selectedKeys"
                        mode="inline">
                    <a-menu-item key="basic">基本设置</a-menu-item>
                    <a-menu-item key="safe">安全设置</a-menu-item>
                    <a-menu-item key="custom">个性化</a-menu-item>
                    <a-menu-item key="bind">账号绑定</a-menu-item>
                    <a-menu-item key="message">新消息通知</a-menu-item>
                </a-menu>
            </a-col>
            <a-col flex="auto">
                <component :is="componentName"></component>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import {computed, ref} from 'vue'
import {head} from 'lodash'

import Basic from './components/Basic'

export default {
    name: 'userSetting',
    components: {Basic},
    setup() {
        const selectedKeys = ref(['basic'])
        const componentName = computed(() => head(selectedKeys.value))

        return {
            selectedKeys,
            componentName,
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
