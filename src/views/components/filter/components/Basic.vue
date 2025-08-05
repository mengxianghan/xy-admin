<demo>
## 基础用法
包含了单选、多选、全部选项等基础用法
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'
import { useForm } from '@/hooks'

const { formData } = useForm()

const brandOptions = ref([
  { label: '小米', value: 1 },
  { label: '荣耀', value: 2 },
  { label: 'vivo', value: 3 },
  { label: '华为', value: 4 },
  { label: '苹果', value: 5 },
  { label: 'oppo', value: 6 },
  { label: '魅族', value: 7 },
])
const classificationOptions = ref([
  { label: '手机', value: 1 },
  { label: '二手手机', value: 2 },
  { label: '合约机', value: 3 },
])
const memoryOptions = ref([
  { label: '全部', value: 0, unlimited: true },
  { label: '1TB', value: 1 },
  { label: '512GB', value: 2 },
  { label: '256GB', value: 3 },
  { label: '128GB', value: 4 },
  { label: '64GB', value: 5 },
  { label: '32GB及以下', value: 6 },
  { label: '未公布', value: 7 },
  { label: '未上市', value: 8 },
])
const cpuOptions = ref([
  { label: '全部', value: 0, unlimited: true },
  { label: '骁龙8+ Gen 1', value: 1 },
  { label: '第二代骁龙8', value: 2 },
  { label: '天玑9200', value: 3 },
  { label: '天玑8200', value: 4 },
  { label: 'A16', value: 5 },
  { label: 'A15', value: 6 },
  { label: 'Apple A系列', value: 7 },
  { label: '第三代骁龙8', value: 8 },
])

formData.value = {
  brand: 1,
  classification: 1,
  memory: 0,
  cpu: [0],
}
</script>

<template>
  <x-filter :model="formData">
    <x-filter-item label="品牌">
      <x-tag-select
        v-model="formData.brand"
        :options="brandOptions"
      />
    </x-filter-item>
    <x-filter-item label="分类">
      <x-tag-select
        v-model="formData.classification"
        :options="classificationOptions"
      />
    </x-filter-item>
    <x-filter-item label="机身内存">
      <x-tag-select
        v-model="formData.memory"
        :options="memoryOptions"
      />
    </x-filter-item>
    <x-filter-item label="CPU型号">
      <x-tag-select
        v-model="formData.cpu"
        :options="cpuOptions"
        multiple
      />
    </x-filter-item>
  </x-filter>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
