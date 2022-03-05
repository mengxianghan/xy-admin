<template>
    <a-alert>
        <template #message>
            由于地区联动组件逻辑复杂，接口逻辑将一并封装至组件内，相似组件在此基础上进行扩展
        </template>
    </a-alert>
    <a-row :gutter="16"
           class="mt-8-2">
        <a-col :span="18">
            <a-card title="基础示例">
                <x-region v-model="field1"></x-region>
            </a-card>
            <a-card title="设置默认值"
                    class="mt-8-2">
                <x-region v-model="field2"></x-region>
            </a-card>
            <a-card title="Change"
                    class="mt-8-2">
                <a-row :gutter="16">
                    <a-col :span="8">
                        <x-region :model-value="field3"
                                  @change="onChange"></x-region>
                    </a-col>
                    <a-col :span="8">
                        <pre>{{ field3 }}</pre>
                    </a-col>
                    <a-col :span="8">
                        <pre>{{ field3SelectedOptions }}</pre>
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="结果">
                <pre>{{ content }}</pre>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'region',
    setup() {
        const field1 = ref([])
        const field2 = ref([1, 11, 111])
        const field3 = ref([])
        const field3SelectedOptions = ref([])

        function onChange(value, selectedOptions) {
            field3.value = value
            field3SelectedOptions.value = selectedOptions
        }

        return {
            field1,
            field2,
            field3,
            field3SelectedOptions,
            onChange,
        }
    },
}
</script>

<style scoped>

</style>