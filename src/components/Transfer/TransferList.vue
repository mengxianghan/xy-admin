<script setup>
import { HomeOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { Empty } from 'ant-design-vue'
import { every, pick } from 'lodash-es'
import { computed, isVNode, nextTick, onMounted, ref, useSlots, watchEffect } from 'vue'
import { getSlotProps } from '@/components/utils'
import { DIRECTION_ENUM } from './config'
import { useTransferInject, useTransferListProvide } from './context'
import TransferListItem from './TransferListItem.vue'

defineOptions({
  name: 'XTransferList',
})

const props = defineProps({
  direction: String,
  dataSource: { type: Array, default: () => [] },
})

const slots = useSlots()
const {
  fieldNames,
  modelValue,
  clearText,
  placeholder,
  showSearch,
  showCheckAll,
  locale,
  immediateCheck,
  loading,
  loadingText,
  finished,
  finishedText,
  error,
  errorText,
  breadcrumb,
  isDynamicLoadData,
  keyword,
  onItemCheckAll,
  onClear,
  onBreadcrumb,
  initInfiniteScroll,
  onLoadData,
  onSearch,
} = useTransferInject()

const checkedAll = ref(false)
const infiniteRef = ref()

const cpIsLeft = computed(() => DIRECTION_ENUM.is('left', props.direction))
const cpIsRight = computed(() => DIRECTION_ENUM.is('right', props.direction))
const cpShowCheckAll = computed(() => cpIsLeft.value && showCheckAll.value)
const cpShowEmpty = computed(() => {
  if (cpIsLeft.value) {
    return !props.dataSource.length && !loading.value && !finished.value && !error.value
  }
  return !props.dataSource.length
})

watchEffect(() => {
  if (DIRECTION_ENUM.is('left', props.direction)) {
    checkedAll.value
            = modelValue.value.length && props.dataSource.length
        ? every(
            props.dataSource.filter(item => !item?.disabled),
            item => modelValue.value.includes(item?.[fieldNames.value?.value]),
          )
        : false
  }
})

onMounted(async () => {
  await nextTick()
  if (isDynamicLoadData.value && cpIsLeft.value) {
    initInfiniteScroll(infiniteRef.value, {
      immediateCheck: immediateCheck.value,
      onLoad: () => {
        onLoadData({ reload: false })
      },
    })
  }
})

/**
 * 刷新
 */
function handleRefresh() {
  onLoadData({ reload: false })
}

/**
 * 清除
 */
function handleClear() {
  onClear()
}

/**
 * 全选发生改变
 */
function onItemCheckAllChange(e) {
  checkedAll.value = e.target.checked
  onItemCheckAll({ checked: checkedAll.value })
}

useTransferListProvide({
  direction: computed(() => props.direction),
})
</script>

<template>
  <div class="x-transfer-list">
    <!-- header -->
    <a-space class="x-transfer-list__header">
      <template v-if="cpShowCheckAll">
        <a-checkbox
          :checked="checkedAll"
          @change="onItemCheckAllChange"
        >
          全选
        </a-checkbox>
      </template>
      <template v-if="cpIsRight">
        <div class="x-transfer__count">
          <slot
            :count="dataSource.length"
            :direction="direction"
            name="selectedText"
          >
            已选 {{ dataSource.length }} 项
          </slot>
        </div>
        <a-typography-link @click="handleClear">
          {{ clearText }}
        </a-typography-link>
      </template>
    </a-space>
    <template v-if="cpIsLeft">
      <!-- 搜索 -->
      <template v-if="showSearch">
        <div class="x-transfer-list__search">
          <a-input
            v-model:value="keyword"
            :placeholder="placeholder"
            allow-clear
            @change="onSearch"
          >
            <template #prefix>
              <search-outlined class="color-placeholder" />
            </template>
          </a-input>
        </div>
      </template>
      <!-- 面包屑 -->
      <div
        v-if="breadcrumb.length"
        class="x-transfer-list__breadcrumb"
      >
        <a-breadcrumb>
          <a-breadcrumb-item @click="onBreadcrumb()">
            <a>
              <home-outlined />
            </a>
          </a-breadcrumb-item>
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumb"
            :key="item[fieldNames.value]"
            @click="onBreadcrumb(item, index)"
          >
            <template v-if="index < breadcrumb.length - 1">
              <a>{{ item[fieldNames.label] }}</a>
            </template>
            <template v-else>
              {{ item[fieldNames.label] }}
            </template>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </template>
    <!-- body -->
    <div class="x-transfer-list__body">
      <!-- 列表 -->
      <div
        ref="infiniteRef"
        class="x-transfer-list__content"
      >
        <transfer-list-item
          v-for="item in dataSource"
          :key="item[fieldNames.value]"
          :checked="modelValue.includes(item[fieldNames.value])"
          :direcrion="direction"
          :record="item"
        >
          <template
            v-for="(_, key) in pick(slots, ['item'])"
            :key="key"
            #[key]="slotProps"
          >
            <slot
              :name="key"
              v-bind="getSlotProps(slotProps)"
            />
          </template>
        </transfer-list-item>
        <!-- 动态加载数据 -->
        <template v-if="isDynamicLoadData && cpIsLeft">
          <template v-if="loading">
            <div class="x-transfer-list__loading-text">
              {{ loadingText }}
            </div>
          </template>
          <template v-if="finished">
            <div class="x-transfer-list__finished-text">
              {{ finishedText }}
            </div>
          </template>
          <template v-if="error">
            <div
              class="x-transfer-list__error-text"
              @click="handleRefresh"
            >
              {{ errorText }}
            </div>
          </template>
        </template>
        <!-- 空状态 -->
        <template v-if="cpShowEmpty">
          <div class="x-transfer-list__empty">
            <template v-if="isVNode(locale.emptyText)">
              <component :is="locale.emptyText" />
            </template>
            <template v-else>
              <empty :image="Empty.PRESENTED_IMAGE_SIMPLE">
                <template #description>
                  {{ locale.emptyText }}
                </template>
              </empty>
            </template>
          </div>
        </template>
      </div>
    </div>
    <!-- footer -->
    <template v-if="slots.footer">
      <div class="x-transfer-list__footer">
        <slot
          :direction="direction"
          name="footer"
        />
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.x-transfer-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 12px;

  &:first-child {
    border-right: @color-border solid 1px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding-inline: 12px;
    margin-bottom: 8px;
    box-sizing: content-box;
    min-height: @control-height;
  }

  &__search {
    padding-inline: 12px;
    margin-bottom: 8px;
    flex-shrink: 0;
  }

  &__breadcrumb {
    padding-inline: 12px;
    margin-bottom: 8px;
    flex-shrink: 0;

    :deep(.ant-breadcrumb) {
      a {
        transition-property: color, background-color;
      }
    }
  }

  &__body {
    overflow: hidden;
    flex: auto;
    display: flex;
    flex-direction: column;
  }

  &__content {
    flex: auto;
    overflow: auto;
    padding-inline: 4px;
    margin: 0;
  }

  &__empty {
    margin: auto;
    flex: none;
  }

  &__loading-text,
  &__finished-text,
  &__error-text {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 8px;
    color: @color-text-placeholder;
  }

  &__error-text {
    cursor: pointer;
  }

  &__footer {
    flex-shrink: 0;
    padding: 8px 12px;
    display: flex;
    align-items: center;
  }
}
</style>
