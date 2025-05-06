<script setup>
import { useForm, usePagination } from '@/hooks'
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import Menus from './components/Menu.vue'

defineOptions({
  name: 'SystemNewMenu',
})

const appStore = useAppStore()
const { searchFormData } = usePagination()
const { formData } = useForm()

const selectedMenu = ref({})
const actionList = ref([])

const cpStyle = computed(() => {
  return {
    height: appStore.mainHeight,
  }
})
const cpBodyStyle = computed(() => {
  return {
    height: 'calc(100% - 56px)',
    padding: 0,
  }
})

/**
 * 菜单发生改变
 * @param {object} payload
 */
function onMenuChange(payload) {
  selectedMenu.value = payload
}
</script>

<template>
  <a-row
    :gutter="8"
    :wrap="false"
  >
    <a-col flex="0 0 280px">
      <menus
        v-model:value="searchFormData.menu"
        @change="onMenuChange"
      />
    </a-col>
    <a-col flex="1.2">
      <a-card
        :body-style="cpBodyStyle"
        :style="cpStyle"
        title="菜单信息"
      >
        <x-scrollbar class="pa-8-2">
          <a-form
            :label-col="{ style: { width: '100px' } }"
            :model="formData"
          >
            <a-form-item
              label="名称"
              name="name"
            >
              <a-input v-model:value="formData.name" />
            </a-form-item>
            <a-form-item label="所属上级">
              <a-tree-select
                v-model:value="formData.parent_id"
                :field-names="{ children: 'children', label: 'name', key: 'key', value: 'key' }"
                tree-default-expand-all
              />
            </a-form-item>
            <a-form-item
              label="类型"
              name="type"
            >
              <a-radio-group
                v-model:value="formData.type"
                :options="[
                  { label: '菜单', value: 1 },
                  { label: 'iframe', value: 2 },
                  { label: '外链', value: 3 },
                ]"
              />
            </a-form-item>
            <a-form-item
              extra="系统唯一且与内置组件名一致，否则导致缓存失效"
              label="别名"
              name="alias"
            >
              <a-input v-model:value="formData.alias" />
            </a-form-item>
            <a-form-item
              label="图标"
              name="icon"
            >
              <a-input v-model:value="formData.icon" />
            </a-form-item>
            <a-form-item
              label="路由地址"
              name="path"
            >
              <a-input v-model:value="formData.path" />
            </a-form-item>
            <a-form-item
              label="重定向"
              name="redirect"
            >
              <a-input v-model:value="formData.redirect" />
            </a-form-item>
            <a-form-item
              label="视图地址"
              name="view"
            >
              <a-input v-model:value="formData.view" />
            </a-form-item>
            <a-form-item
              extra="子节点或详情页需要高亮的上级菜单别名"
              label="菜单高亮"
              name="active"
            >
              <a-input v-model:value="formData.active" />
            </a-form-item>
            <a-form-item
              extra="不显示在导航中，但依然可以访问，例如详情页"
              label="隐藏"
              name="is_menu"
            >
              <a-switch v-model:checked="formData.is_menu" />
            </a-form-item>
            <a-form-item
              :colon="false"
              label="&nbsp;"
            >
              <a-button type="primary">
                保存
              </a-button>
            </a-form-item>
          </a-form>
        </x-scrollbar>
      </a-card>
    </a-col>
    <a-col flex="1">
      <a-card
        :body-style="cpBodyStyle"
        :style="cpStyle"
        title="权限按钮"
      >
        <x-scrollbar class="pa-8-2">
          <x-form-table
            v-model="actionList"
            :row-tpl="{ name: '', alias: '' }"
            bordered
          >
            <a-table-column
              data-index="name"
              title="名称"
            >
              <template #default="{ record }">
                <a-input v-model:value="record.name" />
              </template>
            </a-table-column>
            <a-table-column
              data-index="alias"
              title="标识"
            >
              <template #default="{ record }">
                <a-input v-model:value="record.alias" />
              </template>
            </a-table-column>
          </x-form-table>
        </x-scrollbar>
      </a-card>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped></style>
