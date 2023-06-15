<template>
    <a-drawer
        v-model:visible="visible"
        title="系统设置"
        :closable="false"
        :width="300">
        <a-form
            label-align="left"
            :colon="false"
            :label-col="{ span: 24 }">
            <a-form-item
                label="菜单模式"
                class="mb-8-2">
                <a-space
                    class="setting-radio"
                    :size="16">
                    <a-tooltip
                        v-for="item in menuModeList"
                        :key="item.value"
                        :title="item.label">
                        <div
                            class="setting-radio-item"
                            :class="{
                                [`setting-radio-item--${item.value}`]: true,
                            }"
                            @click="handleMenuMode(item)">
                            <check-outlined v-if="config.menuMode === item.value"></check-outlined>
                        </div>
                    </a-tooltip>
                </a-space>
            </a-form-item>
            <template v-if="config.menuMode === 'side'">
                <a-form-item
                    label="侧边风格"
                    class="mb-8-2">
                    <a-space
                        class="setting-radio"
                        :size="16">
                        <a-tooltip
                            v-for="item in themeList"
                            :key="item.value"
                            :title="item.label">
                            <div
                                class="setting-radio-item setting-radio-item-side"
                                :class="{
                                    [`setting-radio-item-side--${item.value}`]: true,
                                }"
                                @click="handleSideTheme(item)">
                                <check-outlined v-if="config.sideTheme === item.value"></check-outlined>
                            </div>
                        </a-tooltip>
                    </a-space>
                </a-form-item>
            </template>
            <a-form-item
                label="顶部风格"
                class="mb-8-2">
                <a-space
                    class="setting-radio"
                    :size="16">
                    <a-tooltip
                        v-for="item in themeList"
                        :key="item.value"
                        :title="item.label">
                        <div
                            class="setting-radio-item setting-radio-item-header"
                            :class="{
                                [`setting-radio-item-header--${item.value}`]: true,
                            }"
                            @click="handleHeaderTheme(item)">
                            <check-outlined v-if="config.headerTheme === item.value"></check-outlined>
                        </div>
                    </a-tooltip>
                </a-space>
            </a-form-item>
            <a-divider></a-divider>
            <div class="mb-8-2">内容区域</div>
            <a-form-item
                label="标签页"
                :label-col="{ flex: 'auto' }"
                :wrapper-col="{ style: { flex: '0 0 auto' } }">
                <a-switch
                    v-model:checked="config.multiTab"
                    size="small"></a-switch>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { CheckOutlined } from '@ant-design/icons-vue'

import { useAppStore } from '@/store'

defineOptions({
    name: 'GlobalSettingDialog',
})

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const visible = ref(false)
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
    visible.value = true
}

function handleSideTheme({ value }) {
    config.value.sideTheme = value
}

function handleHeaderTheme({ value }) {
    config.value.headerTheme = value
}

function handleMenuMode({ value }) {
    config.value.menuMode = value
    if (value === 'mix') {
        config.value.sideTheme = 'light'
    }
}

defineExpose({
    handleOpen,
})
</script>

<style lang="less" scoped>
.setting-radio {
    &-item {
        position: relative;
        width: 44px;
        height: 36px;
        overflow: hidden;
        background-color: #f0f2f5;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
        cursor: pointer;

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 33%;
            height: 100%;
            background-color: #fff;
            content: '';
        }

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 25%;
            background-color: #fff;
            content: '';
        }

        :deep(.anticon) {
            position: absolute;
            right: 6px;
            bottom: 4px;
            font-weight: 700;
            font-size: 14px;
            pointer-events: none;
        }

        &-side {
            &::after {
                display: none;
            }

            :deep(.anticon) {
                top: 4px;
            }
        }

        &-side--dark {
            &::before {
                z-index: 1;
                background-color: #001529;
            }
        }

        &-header {
            &::before {
                display: none;
            }

            :deep(.anticon) {
                right: 14px;
            }
        }

        &-header--dark {
            &::after {
                background-color: #001529;
            }
        }

        &--side {
            &::before {
                z-index: 1;
                background-color: #001529;
            }
        }

        &--top {
            &::before {
                display: none;
            }

            &::after {
                z-index: 1;
                background-color: #001529;
            }

            :deep(.anticon) {
                right: 14px;
            }
        }

        &--mix {
            &::after {
                z-index: 1;
                background-color: #001529;
            }
        }
    }
}
</style>
