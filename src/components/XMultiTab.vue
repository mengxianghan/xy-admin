<template>
    <div class="x-multi-tab">
        <a-tabs :active-key="current"
                type="card"
                @change="handleChange">
            <a-tab-pane v-for="(item,index) in multiTabList"
                        :key="index">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div>
                            {{ item.meta.title }}
                            <span v-if="current === index"
                                  class="x-multi-tab__reload-btn"
                                  @click.stop="handleReload(item)">
                                <reload-outlined class="ma-0"
                                                 :class="{'anticon-spin': isReload}"/>
                            </span>
                            <span class="x-multi-tab__close-btn"
                                  @click.stop="handleClose(item)">
                                <close-outlined class="ma-0"/>
                            </span>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="reload"
                                             @click="handleReload(item)">重新加载
                                </a-menu-item>
                                <a-menu-item key="close"
                                             @click="handleClose(item)">关闭
                                </a-menu-item>
                                <a-menu-item v-if="multiTabList.length > 1"
                                             key="closeOther"
                                             @click="handleCloseOther(item)">关闭其他
                                </a-menu-item>
                                <a-menu-item v-if="index > 0"
                                             key="closeLeft"
                                             @click="handleCloseLeft(item)">关闭左侧
                                </a-menu-item>
                                <a-menu-item v-if="index < multiTabList.length - 1"
                                             key="closeRight"
                                             @click="handleCloseRight(item)">关闭右侧
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import {CloseOutlined, ReloadOutlined} from '@ant-design/icons-vue'
import {onMounted, computed, ref, nextTick} from 'vue'
import {useStore} from 'vuex'
import {useRouter, onBeforeRouteUpdate} from 'vue-router'

export default {
    name: 'XMultiTab',
    components: {
        CloseOutlined,
        ReloadOutlined
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const multiTabList = computed(() => store.getters['multiTab/list'])
        const current = computed(() => store.getters['multiTab/current'])
        const isReload = ref(false)

        function handleOpen(route) {
            store.dispatch('multiTab/open', {route})
        }

        function handleClose(route) {
            store.dispatch('multiTab/close', {route})
        }

        function handleCloseLeft(route) {
            store.dispatch('multiTab/closeLeft', {route})
        }

        function handleCloseRight(route) {
            store.dispatch('multiTab/closeRight', {route})
        }

        function handleCloseOther(route) {
            store.dispatch('multiTab/closeOther', {route})
        }

        function handleReload(route) {
            // 判断是否当前路由
            if (route.fullPath !== router.currentRoute.value.fullPath) {
                // 不是当前路由，跳转到指定路由
                router.push(route)
            }
            this.isReload = true
            setTimeout(() => {
                isReload.value = false
            }, 1000)
            setTimeout(() => {
                store.dispatch('multiTab/reload', {route})
                nextTick(() => {
                    store.dispatch('multiTab/reload', {route})
                })
            }, 0)
        }

        function handleChange(index) {
            router.push(multiTabList.value[index])
        }

        onBeforeRouteUpdate((to) => {
            handleOpen(to)
        })

        onMounted(() => {
            handleOpen(router.currentRoute.value)
        })

        return {
            multiTabList,
            current,
            isReload,
            handleClose,
            handleCloseLeft,
            handleCloseRight,
            handleCloseOther,
            handleReload,
            handleChange
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-multi-tab {
    position: sticky;
    top: 48px;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    &__reload-btn,
    &__close-btn {
        font-size: 12px;
        margin-left: 8px;
        color: @text-color-secondary;
        transition: color .3s;

        &:hover {
            color: @primary-color;
        }
    }

    :deep(.ant-tabs) {
        background: #ffffff;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav) {
        margin-bottom: 0;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav::before) {
        display: none;
    }

    :deep(.ant-dropdown-trigger) {
        display: flex;
        padding: 0 16px;
        align-items: center;
        font-weight: 400;
    }

    :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
        height: 40px;
        padding: 0;
    }
}
</style>
