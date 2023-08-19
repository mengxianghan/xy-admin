<template>
    <a-drawer
        v-model:open="open"
        title="系统设置"
        :closable="false"
        :width="300">
        <a-form
            label-align="left"
            :colon="false"
            :label-col="{ span: 24 }">
            <div class="mb-8-2 fw-600">菜单设置</div>
            <a-form-item
                label="布局类型"
                class="mb-8-2"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-select
                    v-model:value="config.layout"
                    :options="layoutList"
                    @change="onChange"></a-select>
            </a-form-item>
            <a-form-item
                label="菜单模式"
                class="mb-8-2"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-select
                    v-model:value="config.menuMode"
                    :options="menuModeList"
                    @change="onChange"></a-select>
            </a-form-item>
            <a-form-item
                label="顶部风格"
                class="mb-8-2"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-select
                    v-model:value="config.headerTheme"
                    :options="themeList"
                    @change="onChange"></a-select>
            </a-form-item>
            <a-form-item
                label="侧边风格"
                class="mb-8-2"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-select
                    v-model:value="config.sideTheme"
                    :options="themeList"
                    @change="onChange"></a-select>
            </a-form-item>
            <a-divider></a-divider>
            <div class="mb-8-2 fw-600">内容区域</div>
            <a-form-item
                label="标签页"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-switch
                    v-model:checked="config.multiTab"
                    size="small"
                    @change="onChange"></a-switch>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const open = ref(false)
const layoutList = ref([
    { value: 'topBottom', label: '上下布局' },
    { value: 'leftRight', label: '左右布局' },
])
const themeList = ref([
    { value: 'light', label: '亮色模式' },
    { value: 'dark', label: '暗色模式' },
])
const menuModeList = ref([
    { value: 'side', label: '侧边菜单' },
    { value: 'top', label: '顶部菜单' },
    { value: 'mix', label: '混合菜单' },
])

function handleOpen() {
    open.value = true
}

function onChange() {
    appStore.updateConfig()
}

defineExpose({
    handleOpen,
})
</script>

<style lang="less" scoped></style>
