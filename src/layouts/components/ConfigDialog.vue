<template>
    <a-drawer
        v-model:open="open"
        title="系统设置"
        :closable="false"
        :width="300"
        :body-style="{
            paddingBlock: '16px',
        }">
        <a-form
            label-align="left"
            :colon="false"
            :label-col="{ span: 24 }">
            <a-form-item class="mb-8-2">
                <template #label>
                    <div class="fw-bold">布局类型</div>
                </template>
                <a-radio-group
                    v-model:value="config.layout"
                    @change="onChange">
                    <a-tooltip
                        v-for="item in layoutList"
                        :title="item.label"
                        :key="item.value">
                        <layout-radio
                            :header-theme="item.headerTheme"
                            :aside-theme="item.asideTheme"
                            :value="item.value"></layout-radio>
                    </a-tooltip>
                </a-radio-group>
            </a-form-item>
            <a-form-item class="mb-8-2">
                <template #label>
                    <div class="fw-bold">菜单模式</div>
                </template>
                <a-radio-group
                    v-model:value="config.menuMode"
                    @change="onChange">
                    <a-tooltip
                        v-for="item in menuModeList"
                        :title="item.label"
                        :key="item.value">
                        <layout-radio
                            :header-theme="item.headerTheme"
                            :header-z-index="item.headerZIndex"
                            :aside-theme="item.asideTheme"
                            :value="item.value"></layout-radio>
                    </a-tooltip>
                </a-radio-group>
            </a-form-item>
            <a-form-item class="mb-8-2">
                <template #label>
                    <div class="fw-bold">顶部风格</div>
                </template>
                <a-radio-group
                    v-model:value="config.headerTheme"
                    @change="onChange">
                    <a-tooltip
                        v-for="item in themeList"
                        :title="item.label"
                        :key="item.value">
                        <layout-radio
                            :header-theme="item.theme"
                            :value="item.value"></layout-radio>
                    </a-tooltip>
                </a-radio-group>
            </a-form-item>
            <a-form-item class="mb-8-2">
                <template #label>
                    <div class="fw-bold">侧边风格</div>
                </template>
                <a-radio-group
                    v-model:value="config.sideTheme"
                    @change="onChange">
                    <a-tooltip
                        v-for="item in themeList"
                        :title="item.label"
                        :key="item.value">
                        <layout-radio
                            :aside-theme="item.theme"
                            :value="item.value"></layout-radio>
                    </a-tooltip>
                </a-radio-group>
            </a-form-item>
            <a-divider></a-divider>
            <div class="mb-8-2 fw-bold">内容区域</div>
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
import LayoutRadio from './LayoutRadio.vue'

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const open = ref(false)

const layoutList = ref([
    { value: 'leftRight', label: '左右布局', asideTheme: 'dark' },
    { value: 'topBottom', label: '上下布局', headerTheme: 'dark' },
])

const themeList = ref([
    { value: 'dark', label: '暗色模式', theme: 'dark' },
    { value: 'light', label: '亮色模式', theme: 'light' },
])

const menuModeList = ref([
    { value: 'side', label: '侧边菜单', asideTheme: 'dark' },
    { value: 'top', label: '顶部菜单', headerTheme: 'dark' },
    { value: 'mix', label: '混合菜单', asideTheme: 'light', headerTheme: 'dark', headerZIndex: 2 },
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
