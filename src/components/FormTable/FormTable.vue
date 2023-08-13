<template>
    <a-table
        class="x-form-table"
        size="middle"
        v-bind="$attrs"
        :data-source="listData"
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
                    <plus-outlined />
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
                        <delete-outlined />
                    </a-button>
                </div>
            </template>
        </a-table-column>
        <slot></slot>
    </a-table>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'XFormTable',
})

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

const emit = defineEmits(['update:modelValue', 'add', 'delete'])

const listData = ref([])

watch(listData, (val) => emit('update:modelValue', val), { deep: true })

onMounted(() => {
    listData.value = props.modelValue
})

/**
 * 新增
 */
function handleAdd() {
    listData.value.push(cloneDeep(props.rowTpl))
    emit('add')
}

/**
 * 删除
 */
function handleDelete(index) {
    const delRecord = props.modelValue[index]
    listData.value.splice(index, 1)
    emit('delete', { record: delRecord })
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

                .anticon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        &:hover {
            .action {
                &__txt {
                    display: none;
                }

                &__btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
