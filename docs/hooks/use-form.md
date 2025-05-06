# useForm

## 代码演示

### 基础用法

```vue
<script setup>
import { useForm } from '@/hooks'

const { formData, formRecord, formRules, formRef } = useForm()

// 设置校验规则
formRules.value = {
  title: { required: true, message: '请输入标题' },
}

/**
 * 提交表单
 */
function handleSubmit() {
  formRef.value
    .validate()
    .then((values) => {
      // 校验成功
      console.log(values)
    })
    .catch(() => {
      console.log('校验失败')
    })
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
  >
    <a-form-item
      name="title"
      label="标题"
    >
      <a-input v-model:value="formData.value" />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        @click="handleSubmit"
      >
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
```
