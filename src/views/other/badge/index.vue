<script setup>
import { useMenu } from '@/hooks'
import { ref } from 'vue'

defineOptions({
  name: 'OtherBadge',
})

const { setBadge } = useMenu()

const form = ref({
  name: 'welcome',
  count: 10,
})

function handleSet() {
  setBadge(form.value?.name, form.value?.count)
}

function handleClear() {
  setBadge(form.value?.name, 0)
}
</script>

<template>
  <a-card title="基础示例">
    <a-space>
      <a-input v-model:value="form.name" />
      <a-input-number
        v-model:value="form.count"
        :min="0"
      />
      <a-button @click="handleSet">
        设置
      </a-button>
      <a-button @click="handleClear">
        清除
      </a-button>
    </a-space>
  </a-card>
</template>

<style lang="less" scoped></style>
