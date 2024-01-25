# useForm

## 代码演示

### 基础用法

```vue
<template>
    <a-form
        ref="formRef"
        :model="formData"
        :rules="formRules">
        <a-form-item
            name="title"
            label="标题">
            <a-input v-model:value="formData.value"></a-input>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { useForm } from '@/hooks'

const { formData, formRecord, formRules, formRef } = useForm()
</script>

<style lang="less" scoped></style>
```

