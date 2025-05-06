<demo>
## 自定义渲染行
自定义渲染每一个 Transfer Item，可用于渲染复杂数据。
</demo>

<!-- #region snippet -->
<script setup>
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const listData = ref(getList())
const selectedKeys = ref([])

function getList(length = 10) {
  return Array.from({ length }).map(() => {
    const value = nanoid(5)
    return {
      label: value,
      value,
    }
  })
}
</script>

<template>
  <x-transfer
    v-model="selectedKeys"
    :data-source="listData"
    :style="{ width: '680px' }"
  >
    <template #item="{ record, direction }">
      <a-row
        :gutter="8"
        align="middle"
      >
        <a-col>
          <a-avatar />
        </a-col>
        <a-col>
          <a-space
            :size="0"
            class="lh-1"
            direction="vertical"
          >
            <a-typography-text>{{ record.label }}</a-typography-text>
            <a-typography-text
              class="fs-12"
              type="secondary"
            >
              <template v-if="direction === 'left'">
                描述--左侧
              </template>
              <template v-else>
                描述--右侧
              </template>
            </a-typography-text>
          </a-space>
        </a-col>
      </a-row>
    </template>
  </x-transfer>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
