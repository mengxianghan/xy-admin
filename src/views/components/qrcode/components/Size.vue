<demo>
## 自定义尺寸
自定义尺寸
</demo>

<!-- #region snippet -->
<script setup>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { assets } from '@/utils'

const text = ref('http://xy-admin.xuanyunet.com')
const size = ref(160)

function handleDecline() {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}

function handleIncrease() {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
</script>

<template>
  <a-space
    :size="24"
    direction="vertical"
  >
    <a-button-group>
      <a-button @click="handleDecline">
        <template #icon>
          <minus-outlined />
        </template>
        small
      </a-button>
      <a-button @click="handleIncrease">
        <template #icon>
          <plus-outlined />
        </template>
        large
      </a-button>
    </a-button-group>

    <x-qrcode
      :icon="assets('logo.svg')"
      :size="size"
      :value="text"
      icon-background-color="#fff"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
