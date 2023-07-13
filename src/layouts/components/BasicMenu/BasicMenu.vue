<template>
    <a-menu
        v-model:selected-keys="selectedKeys"
        :inline-collapsed="collapsed"
        :mode="mode"
        :open-keys="cpOpenKeys"
        :theme="theme"
        class="basic-menu"
        @openChange="onOpenChange">
        <template
            v-for="item in dataList"
            :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name">
                    <menu-link :data-source="item" />
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :data-source="item" />
            </template>
        </template>
    </a-menu>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import MenuLink from './MenuLink.vue'
import SubMenu from './SubMenu.vue'

defineOptions({
    name: 'BasicMenu',
})

/**
 * @property {string} theme 主题，【dark=暗色，light=亮色】
 * @property {string} mode 菜单类型，【vertical=垂直，horizontal=水平，inline=内嵌】
 * @property {array} dataList 数据
 */
const props = defineProps({
    theme: {
        type: String,
        default: 'dark',
    },
    mode: {
        type: String,
        default: 'inline',
    },
    dataList: {
        type: Array,
        default: () => [],
    },
})
const route = useRoute()

const collapsed = ref(false)
const openKeys = ref([])
const selectedKeys = ref([])

const cpIsHorizontal = computed(() => props.mode === 'horizontal')
const rootSubmenuKeys = computed(() => props.dataList.map((item) => item.name))
const cpOpenKeys = computed(() => {
    if (cpIsHorizontal.value) {
        return []
    }
    return openKeys.value
})

watch(route, () => setSelectedMenu())

onMounted(() => {
    setSelectedMenu()
})

/**
 * 设置选中菜单
 */
function setSelectedMenu() {
    const { meta } = route || {}
    openKeys.value = meta?._openKeys || []
    selectedKeys.value = meta?._breadcrumb.map((item) => item?.meta?.active || item.name)
}

/**
 * SubMenu 展开/关闭的回调
 * @param value
 */
function onOpenChange(value) {
    if (cpIsHorizontal.value) return
    const latestOpenKey = value.find((key) => openKeys.value.indexOf(key) === -1)
    if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
        openKeys.value = value
    } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : []
    }
}
</script>

<style lang="less" scoped></style>
