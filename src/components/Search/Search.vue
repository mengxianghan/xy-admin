<script setup>
import { createReusableTemplate } from '@vueuse/core'
import { useAttrs } from 'vue'
import { Grid } from '../Grid'

defineOptions({
  name: 'XSearch',
})

defineProps({
  columns: {
    type: [Number, Object],
    default: 4,
  },
  collapsed: Boolean,
  collapsedRows: Number,
  gutter: {
    type: [Number, Array],
    default: () => [12, 12],
  },
  bordered: {
    type: Boolean,
    default: true,
  },
})

const attrs = useAttrs()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="x-search">
    <define-template>
      <a-form
        layout="inline"
        v-bind="attrs"
      >
        <grid
          :collapsed="collapsed"
          :collapsed-rows="collapsedRows"
          :columns="columns"
          :gutter="gutter"
        >
          <slot />
        </grid>
      </a-form>
    </define-template>

    <template v-if="bordered">
      <a-card>
        <reuse-template />
      </a-card>
    </template>
    <template v-else>
      <reuse-template />
    </template>
  </div>
</template>

<style lang="less" scoped>
.x-search {
  :deep(.ant-form-inline) {
    display: block;

    .ant-form-item {
      margin-right: 0;
      margin-bottom: 0;

      .ant-row {
        flex-wrap: nowrap;
      }

      .ant-form-item-label {
        flex-shrink: 0;
      }
    }

    @media (max-width: 575px) {
      .ant-form-item {
        .ant-row {
          flex-wrap: wrap;
        }
      }
    }
  }

  :deep(.ant-form-item-control-input-content) {
    > .ant-input,
    > .ant-select,
    > .ant-picker {
      width: 100%;
    }
  }
}
</style>
