<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<script setup>
import { useForm } from '@/hooks'

const { formData } = useForm()

formData.value = {
  data: [],
}
</script>

<template>
  <x-form-table v-model="formData.data">
    <a-table-column title="名称">
      <template #default="{ record }">
        <a-input v-model:value="record.key" />
      </template>
    </a-table-column>
    <a-table-column title="标识">
      <template #default="{ record }">
        <a-input v-model:value="record.key" />
      </template>
    </a-table-column>
  </x-form-table>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
