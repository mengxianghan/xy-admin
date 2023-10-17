<template>
    <div
        class="x-transfer-list-item"
        @click="handleClick">
        <template v-if="cpShowCheckbox">
            <a-checkbox
                class="x-transfer-list-item__checkbox"
                :disabled="cpDisabled"
                :checked="curChecked"></a-checkbox>
        </template>
        <div class="x-transfer-list-item__content">
            <slot>
                {{ record[fieldNames.label] }}
            </slot>
        </div>
        <div class="x-transfer-list-item__extra">
            <template v-if="cpShowRemove">
                <a-button
                    type="text"
                    size="small"
                    @click.stop="handleRemove">
                    <template #icon>
                        <close-outlined></close-outlined>
                    </template>
                </a-button>
            </template>

            <template v-if="cpShowNext">
                <a-button
                    type="text"
                    size="small"
                    @click.stop="handleNext">
                    <template #icon>
                        <right-outlined></right-outlined>
                    </template>
                </a-button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { theme } from 'ant-design-vue'
import { ref, watch, computed } from 'vue'
import { useTransferInject } from './context'
import { CloseOutlined, RightOutlined } from '@ant-design/icons-vue'

const props = defineProps({
    record: {
        type: Object,
        default: () => ({}),
    },
    direction: {
        type: String,
    },
})

const { token } = theme.useToken()
const { modelValue, fieldNames, onCheck, onNext } = useTransferInject()

const curChecked = ref(false)

const cpIsLeft = computed(() => props.direction === 'left')
const cpShowCheckbox = computed(() => cpIsLeft.value)
const cpShowRemove = computed(() => !cpIsLeft.value)
const cpShowNext = computed(() => cpIsLeft.value && props.record.children?.length)
const cpDisabled = computed(() => props.record.disabled)

watch(
    () => modelValue.value,
    (val) => {
        const checked = val.includes(props.record?.[fieldNames.value?.value])
        if (curChecked.value === checked) return
        curChecked.value = checked
    },
    { immediate: true, deep: true }
)

/**
 * 点击
 */
function handleClick() {
    if (!cpIsLeft.value) return

    if (cpDisabled.value) return

    onToggle()
}

/**
 * 移除
 */
function handleRemove() {
    onToggle()
}

/**
 * 下级
 */
function handleNext() {
    onNext(props.record)
}

/**
 * 切换选中
 */
function onToggle() {
    curChecked.value = !curChecked.value
    onCheck(props.record?.[fieldNames.value?.value], { checked: curChecked.value })
}
</script>

<style lang="less" scoped>
.x-transfer-list-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: @border-radius;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: v-bind('token.controlItemBgHover');
    }

    &__checkbox {
        flex-shrink: 0;
        margin-right: 8px;
    }

    &__icon {
        flex-shrink: 0;
        margin-right: 8px;
        display: flex;
        align-items: center;
    }

    &__avatar {
        flex-shrink: 0;
        margin-right: 8px;
    }

    &__content {
        flex: 1;
    }

    &__description {
        font-size: 12px;
        color: @color-text-description;
        margin-top: 2px;
    }

    &__extra {
        margin: 0 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        gap: 4px;

        :deep(.ant-btn) {
            &.ant-btn-text {
                .anticon {
                    font-size: 10px;
                }
            }
        }
    }

    // &__btn {
    //     transition: all 0.2s;
    //     height: 24px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     border-radius: @border-radius;
    //     color: @color-text-label;

    //     &--icon {
    //         width: 24px;

    //         &:hover {
    //             background: @control-item-bg-hover;
    //         }
    //     }

    //     &--link {
    //         color: @color-primary;
    //         padding-inline: 4px;
    //         font-size: 14px;

    //         &:hover {
    //             background: v-bind('token.colorPrimaryBgHover');
    //         }
    //     }
    // }
}
</style>
