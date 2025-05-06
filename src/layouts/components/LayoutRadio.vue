<script setup>
defineProps({
  asideTheme: {
    type: String,
    default: '',
  },
  asideZIndex: {
    type: Number,
    default: 1,
  },
  headerTheme: {
    type: String,
    default: '',
  },
  headerZIndex: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <a-radio
    :class="{
      [`layout-radio--aside-${asideTheme}`]: true,
      [`layout-radio--header-${headerTheme}`]: true,
    }"
  />
</template>

<style lang="less" scoped>
.ant-radio-wrapper {
  width: 44px;
  height: 36px;
  background: #eff1f4;
  border-radius: @border-radius-sm;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 36px 0 rgba(0, 0, 0, 0.08);

  &.layout-radio {
    &--aside {
      &-dark {
        &::before {
          background: #001529;
        }
      }

      &-light {
        &::before {
          background: #fff;
        }
      }
    }

    &--header {
      &-dark {
        &::after {
          background: #001529;
        }
      }

      &-light {
        &::after {
          background: #fff;
        }
      }
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    border: 0;
    border-radius: 0;
  }

  &::before {
    width: 33%;
    height: 100%;
    z-index: v-bind('asideZIndex');
  }

  &::after {
    height: 25%;
    width: 100%;
    z-index: v-bind('headerZIndex');
  }

  :deep(.ant-radio) {
    position: absolute;
    z-index: 2;
    right: 7px;
    bottom: 7px;

    .ant-radio-inner {
      border: 0;
      border-radius: 0;
      background: transparent;

      &::after {
        position: absolute;
        top: 16px;
        left: 12px;
        width: 7px;
        height: 12px;
        border: 1px solid @color-primary;
        border-top: 0;
        border-inline-start: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%) scale(1);
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        background: transparent;
        border-radius: 0;
      }
    }
  }
}

:deep(.ant-radio-checked) {
  &:after {
    border: none;
  }
}
</style>
