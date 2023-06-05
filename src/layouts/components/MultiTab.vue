<template>
    <div
        class="multi-tab"
        ref="multiTabRef">
        <a-tabs
            type="card"
            :active-key="current"
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
                                class="multi-tab__reload-btn"
                                @click.stop="handleReload(item)">
                                <reload-outlined
                                    class="ma-0"
                                    :spin="spin" />
                            </span>
                            <span
                                class="multi-tab__close-btn"
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
import { onMounted, computed, ref, nextTick } from 'vue'
import { useMultiTabStore } from '@/store'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useMultiTab from '@/hooks/useMultiTab'
import Sortable from 'sortablejs'

defineOptions({
    name: 'MultiTab',
})

const multiTabStore = useMultiTabStore()
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

const multiTabList = computed(() => multiTabStore.list)
const current = computed(() => multiTabStore.current)
const spin = ref(false)
const multiTabRef = ref()

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
    position: sticky;
    padding: 8px 0;
    background: #fff;
    top: 48px;
    z-index: 100;

    &::before {
        position: absolute;
        content: '';
        border-bottom: @border-color-split solid 1px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    &__reload-btn,
    &__close-btn {
        font-size: 12px;
        margin-left: 8px;
        color: @text-color-secondary;
        transition: color 0.3s;
        line-height: 1;
        height: 12px;

        &:hover {
            color: @primary-color;
        }
    }

    :deep(.ant-tabs) {
        background: #fff;
        padding: 0 @padding-md;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav) {
        margin-bottom: 0;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav::before) {
        display: none;
    }

    :deep(.ant-tabs-tab-btn) {
        height: 100%;
    }

    :deep(.ant-dropdown-trigger) {
        display: flex;
        padding: 0 12px;
        align-items: center;
        font-weight: 400;
        height: 100%;
    }

    :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
        padding: 7px 0;
        border: none;
        border-radius: @border-radius-base;
        background: transparent;

        &:hover {
            background: #fafafa;
            color: @text-color;
        }
    }

    :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active) {
        background: color(~`colorPalette('@{primary-color}', 1) `);
    }

    :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-nav-more) {
        padding-top: 7px;
        padding-bottom: 7px;
    }
}
</style>
