<template>
    <a-menu
        class="basic-menu"
        v-model:selected-keys="selectedKeys"
        :inline-collapsed="collapsed"
        :mode="mode"
        :open-keys="cpOpenKeys"
        :theme="theme"
        :items="cpMenuData"
        @openChange="onOpenChange"
        @click="handleClick"></a-menu>
</template>

<script setup>
import { computed, onMounted, ref, watch, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapping } from '@/utils'

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

const emit = defineEmits(['click'])

const route = useRoute()
const router = useRouter()

const collapsed = ref(false)
const openKeys = ref([])
const selectedKeys = ref([])

const cpIsHorizontal = computed(() => props.mode === 'horizontal')
const rootSubmenuKeys = computed(() => props.dataList?.map((item) => item.name))
const cpOpenKeys = computed(() => {
    if (cpIsHorizontal.value) {
        return []
    }
    return openKeys.value
})
const cpMenuData = computed(() => {
    return mapping({
        data: props.dataList || [],
        fieldNames: {
            key: 'name',
            label: (item) => item?.meta?.title,
            icon: (item) => {
                const icon = item?.meta?.icon
                if (icon) {
                    return h(icon)
                }
                return ''
            },
            children: 'children',
        },
        treeFieldName: 'children',
        keepOtherFields: true,
    })
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
 * 点击菜单
 * @param item
 */
function handleClick({ item }) {
    const { path, meta, props } = item?.originItemValue || {}

    if (props) {
        props?.click?.call(null, item?.originItemValue)
    }

    if (path) {
        if (meta?._isLink) {
            if (meta?.target) {
                window.open(path)
            } else {
                window.location.href = path
            }
        } else {
            router.push({
                path,
                query: meta?.query ?? {},
            })
        }
    }

    emit('click', item?.originItemValue)
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
