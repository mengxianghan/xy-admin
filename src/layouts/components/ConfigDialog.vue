<script setup>
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
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

<template>
  <a-drawer
    v-model:open="open"
    :body-style="{
      paddingBlock: '16px',
    }"
    :closable="false"
    :width="300"
    title="系统设置"
  >
    <a-form
      :colon="false"
      :label-col="{ span: 24 }"
      label-align="left"
    >
      <a-form-item class="mb-8-2">
        <template #label>
          <div class="fw-bold">
            布局类型
          </div>
        </template>
        <a-radio-group
          v-model:value="config.layout"
          @change="onChange"
        >
          <a-tooltip
            v-for="item in layoutList"
            :key="item.value"
            :title="item.label"
          >
            <layout-radio
              :aside-theme="item.asideTheme"
              :header-theme="item.headerTheme"
              :value="item.value"
            />
          </a-tooltip>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="mb-8-2">
        <template #label>
          <div class="fw-bold">
            菜单模式
          </div>
        </template>
        <a-radio-group
          v-model:value="config.menuMode"
          @change="onChange"
        >
          <a-tooltip
            v-for="item in menuModeList"
            :key="item.value"
            :title="item.label"
          >
            <layout-radio
              :aside-theme="item.asideTheme"
              :header-theme="item.headerTheme"
              :header-z-index="item.headerZIndex"
              :value="item.value"
            />
          </a-tooltip>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="mb-8-2">
        <template #label>
          <div class="fw-bold">
            顶部风格
          </div>
        </template>
        <a-radio-group
          v-model:value="config.headerTheme"
          @change="onChange"
        >
          <a-tooltip
            v-for="item in themeList"
            :key="item.value"
            :title="item.label"
          >
            <layout-radio
              :header-theme="item.theme"
              :value="item.value"
            />
          </a-tooltip>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="mb-8-2">
        <template #label>
          <div class="fw-bold">
            侧边风格
          </div>
        </template>
        <a-radio-group
          v-model:value="config.sideTheme"
          @change="onChange"
        >
          <a-tooltip
            v-for="item in themeList"
            :key="item.value"
            :title="item.label"
          >
            <layout-radio
              :aside-theme="item.theme"
              :value="item.value"
            />
          </a-tooltip>
        </a-radio-group>
      </a-form-item>
      <a-divider />
      <div class="mb-8-2 fw-bold">
        内容区域
      </div>
      <a-form-item
        :label-col="{ flex: 'auto' }"
        :wrapper-col="{ style: { flex: '0 0 auto' } }"
        label="标签页"
      >
        <a-switch
          v-model:checked="config.multiTab"
          size="small"
          @change="onChange"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style lang="less" scoped></style>
