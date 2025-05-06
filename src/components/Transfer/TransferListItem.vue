<script setup>
import { CloseOutlined, RightOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import { DIRECTION_ENUM } from './config'
import { useTransferInject, useTransferListInject } from './context'

defineOptions({
  name: 'XTransferItem',
})

const props = defineProps({
  record: {
    type: Object,
    default: () => ({}),
  },
  checked: {
    type: Boolean,
    default: false,
  },
})

const { direction } = useTransferListInject()
const { fieldNames, isDynamicLoadData, onItemCheck, onNext } = useTransferInject()
const { token } = theme.useToken()

const cpIsLeft = computed(() => DIRECTION_ENUM.is('left', direction.value))
const cpIsRight = computed(() => DIRECTION_ENUM.is('right', direction.value))
const cpCheckable = computed(() => {
  const checkable = props.record.checkable
  return ([undefined, null].includes(checkable) || checkable) && cpIsLeft.value
})
const cpHasChildren = computed(() => {
  const checkChildren = props.record[fieldNames.value.children]?.length
  if (isDynamicLoadData.value) {
    const isLeaf = props.record.isLeaf || false
    return !isLeaf || checkChildren
  }
  return checkChildren
})
const cpDisabled = computed(() => props.record.disabled)
const cpNextDisabled = computed(() => props.checked || cpDisabled.value)

function handleDelete() {
  if (cpDisabled.value)
    return

  onItemCheck({
    selectedKey: props.record[fieldNames.value.value],
    selectedRow: props.record,
    checked: false,
    direction: direction.value,
  })
}

function handleClick() {
  if (cpIsRight.value)
    return
  if (cpDisabled.value)
    return
  if (!cpCheckable.value) {
    if (cpHasChildren.value) {
      handleNext()
    }
    return
  }

  onItemCheck({
    selectedKey: props.record[fieldNames.value.value],
    selectedRow: props.record,
    checked: !props.checked,
    direction: direction.value,
  })
}

/**
 * 下级
 */
function handleNext() {
  onNext(props.record)
}
</script>

<template>
  <div
    :class="{
      'x-transfer-list-item--disabled': cpDisabled,
    }"
    class="x-transfer-list-item"
    @click="handleClick"
  >
    <!-- 复选框 -->
    <template v-if="cpCheckable">
      <div class="x-transfer-list-item__checkbox">
        <a-checkbox
          :checked="checked"
          :disabled="cpDisabled"
        />
      </div>
    </template>
    <!-- 内容 -->
    <div class="x-transfer-list-item__content">
      <slot
        :checked="checked"
        :direction="direction"
        :disabled="cpDisabled"
        :record="record"
        name="item"
      >
        {{ record[fieldNames.label] }}
      </slot>
    </div>
    <div class="x-transfer-list-item__extra">
      <!-- 左侧 -->
      <template v-if="cpIsLeft">
        <template v-if="cpHasChildren">
          <template v-if="cpCheckable">
            <a-config-provider
              :theme="{
                components: {
                  Button: {
                    colorText: token.colorPrimary,
                    colorBgTextHover: token.colorPrimaryBg,
                    colorBgTextActive: token.colorPrimaryBg,
                  },
                },
              }"
            >
              <a-button
                :disabled="cpNextDisabled"
                size="small"
                type="text"
                @click.stop="handleNext"
              >
                下级
              </a-button>
            </a-config-provider>
          </template>
          <template v-else>
            <right-outlined class="color-secondary" />
          </template>
        </template>
      </template>
      <!-- 右侧 -->
      <template v-if="cpIsRight">
        <!-- 删除 -->
        <a-button
          size="small"
          type="text"
          @click="handleDelete"
        >
          <template #icon>
            <close-outlined class="color-secondary" />
          </template>
        </a-button>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.x-transfer-list-item {
  display: flex;
  align-items: center;
  min-height: @control-height;
  padding: 4px 8px;
  border-radius: @border-radius;
  transition: all @motion-duration-mid;
  cursor: pointer;

  &:hover {
    background: @control-item-bg-hover;
  }

  &--disabled {
    color: @color-text-disabled;
    cursor: not-allowed;
  }

  &__checkbox {
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

    :deep(.ant-btn) {
      &.ant-btn-sm {
        padding-inline: 2px;
      }

      &.ant-btn-text {
        .anticon {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
