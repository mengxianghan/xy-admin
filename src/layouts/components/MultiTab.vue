<template>
    <div
        ref="multiTabRef"
        class="multi-tab">
        <a-tabs
            :active-key="current"
            type="card"
            @change="handleSwitch">
            <a-tab-pane
                v-for="(item, index) in multiTabList"
                :key="index">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div>
                            {{ item.meta.title }}
                            <span
                                v-if="current === index"
                                class="multi-tab__icon"
                                @click.stop="handleReload(item)">
                                <reload-outlined
                                    :spin="spin"
                                    class="ma-0" />
                            </span>
                            <span
                                class="multi-tab__icon"
                                @click.stop="handleClose(item)">
                                <close-outlined class="ma-0" />
                            </span>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item
                                    key="reload"
                                    @click="handleReload(item)"
                                    >重新加载
                                </a-menu-item>
                                <a-menu-item
                                    key="close"
                                    @click="handleClose(item)"
                                    >关闭
                                </a-menu-item>
                                <a-menu-item
                                    v-if="multiTabList.length > 1"
                                    key="closeOther"
                                    @click="handleCloseOther(item)"
                                    >关闭其他
                                </a-menu-item>
                                <a-menu-item
                                    v-if="index > 0"
                                    key="closeLeft"
                                    @click="handleCloseLeft(item)"
                                    >关闭左侧
                                </a-menu-item>
                                <a-menu-item
                                    v-if="index < multiTabList.length - 1"
                                    key="closeRight"
                                    @click="handleCloseRight(item)"
                                    >关闭右侧
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import Sortable from 'sortablejs'
import { computed, nextTick, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'

import useMultiTab from '@/hooks/useMultiTab'
import { useMultiTabStore, useAppStore } from '@/store'

defineOptions({
    name: 'MultiTab',
})

const multiTabStore = useMultiTabStore()
const appStore = useAppStore()
const router = useRouter()
const {
    getSimpleRoute,
    open,
    close: handleClose,
    closeLeft: handleCloseLeft,
    closeRight: handleCloseRight,
    closeOther: handleCloseOther,
    reload,
} = useMultiTab()

const { config } = storeToRefs(appStore)
const spin = ref(false)
const multiTabRef = ref()

const multiTabList = computed(() => multiTabStore.list)
const current = computed(() => multiTabStore.current)

/**
 * 路由发生变化
 */
onBeforeRouteUpdate((to) => {
    open(getSimpleRoute(to))
})

onMounted(async () => {
    open(getSimpleRoute(router.currentRoute.value))
    await nextTick()
    initDragSort()
})

/**
 * 重新加载
 * @param route
 */
function handleReload(route) {
    reload(route)
    spin.value = true
    setTimeout(() => {
        spin.value = false
    }, 1000)
}

/**
 * 切换标签页
 * @param index
 */
function handleSwitch(index) {
    router.push(multiTabList.value[index])
}

/**
 * 初始化拖拽
 */
function initDragSort() {
    Sortable.create(multiTabRef.value.querySelector('.ant-tabs-nav-list'), {
        handle: '.ant-tabs-tab',
        draggable: '.ant-tabs-tab',
        animation: 200,
    })
}
</script>

<style lang="less" scoped>
.multi-tab {
    background: #fff;
    position: sticky;
    top: v-bind('config.headerHeight + "px"');
    z-index: 10;
    padding: 8px 0 0;

    &__icon {
        margin-left: 8px;
    }

    .ant-dropdown-trigger {
        display: flex;
        align-items: center;
    }

    :deep(.ant-tabs) {
        &.ant-tabs-top {
            .ant-tabs-nav {
                padding: 0 16px;
                margin: 0;
            }
        }
    }
}
</style>
