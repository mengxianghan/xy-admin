<template>
    <a-table
        v-bind="$attrs"
        class="x-form-table"
        size="middle"
        :data-source="list"
        :pagination="false">
        <a-table-column
            key="action"
            align="center"
            :width="44">
            <template #title>
                <a-button
                    size="small"
                    type="primary"
                    shape="circle"
                    class="fs-12"
                    @click="handleAdd">
                    <icon-plus-outlined />
                </a-button>
            </template>
            <template #default="{ index }">
                <div class="action">
                    <span class="action__txt">{{ index + 1 }}</span>
                    <a-button
                        size="small"
                        danger
                        shape="circle"
                        class="fs-12 action__btn"
                        @click="handleDelete(index)">
                        <icon-delete-outlined />
                    </a-button>
                </div>
            </template>
        </a-table-column>
        <slot></slot>
    </a-table>
</template>

<script>
export default { name: 'XFormTable' }
</script>

<script setup>
import { onMounted, ref, watch } from 'vue'

import cloneDeep from 'lodash/cloneDeep'

/**
 * 表单表格
 * @property {array} modelValue v-model
 * @property {object} rowTpl 行模板
 */

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    rowTpl: {
        type: Object,
        default: () => ({}),
    },
})
const emit = defineEmits(['update:modelValue'])

const list = ref([])

watch(list, (val) => emit('update:modelValue', val), { deep: true })

onMounted(() => {
    list.value = props.modelValue
})

/**
 * 新增
 */
function handleAdd() {
    list.value.push(cloneDeep(props.rowTpl))
}

/**
 * 删除
 */
function handleDelete(index) {
    list.value.splice(index, 1)
}
</script>

<style lang="less" scoped>
.x-form-table {
    :deep(.ant-table-row) {
        .action {
            &__txt {
                display: inline-block;
            }

            &__btn {
                display: none;
            }
        }

        &:hover {
            .action {
                &__txt {
                    display: none;
                }

                &__btn {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
