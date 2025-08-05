<script setup>
import { BookOutlined, GithubOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { theme as antTheme, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, useSlots } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/store'
import ActionButton from './ActionButton.vue'

defineOptions({
  name: 'BasicHeader',
})

/**
 * @property {string} theme 主题【light=亮色，dark=暗色】
 */
const props = defineProps({
  theme: {
    type: String,
  },
})
const emit = defineEmits(['config'])

const slots = useSlots(['default', 'left', 'right'])

const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()

const { config } = storeToRefs(appStore)
const { userInfo } = storeToRefs(userStore)
const { token } = antTheme.useToken()

const cpClassNames = computed(() => ({
  [`basic-header--${props.theme}`]: true,
}))
const cpStyles = computed(() => {
  const styles = {
    zIndex: config.value.layout === 'topBottom' ? 120 : 110,
  }

  if (config.value.headerTheme === 'light') {
    styles.boxShadow = `0 0 0 1px ${token.value.colorSplit}`
  }

  return styles
})
const cpShowLeftSlot = computed(() => !!slots.left)
const cpShowDefaultSlot = computed(() => !!slots.default)

/**
 * 退出登录
 */
function handleLogout() {
  Modal.confirm({
    title: '注销登录？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      userStore.logout().then(() => {
        router.push({
          name: 'login',
        })
      })
    },
  })
}

/**
 * 配置
 */
function handleConfig() {
  emit('config')
}
</script>

<template>
  <a-layout-header
    :class="cpClassNames"
    :style="cpStyles"
    class="basic-header"
  >
    <!-- 左侧 -->
    <div
      v-if="cpShowLeftSlot"
      class="basic-header__left"
    >
      <slot name="left" />
    </div>
    <!-- 中间 -->
    <div
      v-if="cpShowDefaultSlot"
      class="basic-header__center"
    >
      <slot />
    </div>
    <!-- 右侧 -->
    <div class="basic-header__right">
      <a-space :size="8">
        <a-tooltip title="使用文档">
          <a
            class="color-text"
            href="http://xy-admin-docs.xuanyunet.com"
            target="_blank"
          >
            <action-button>
              <book-outlined />
            </action-button>
          </a>
        </a-tooltip>

        <a-dropdown>
          <action-button>
            <github-outlined />
          </action-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a
                  class="color-text"
                  href="https://github.com/mengxianghan/xy-admin"
                  target="_blank"
                >
                  GitHub
                </a>
              </a-menu-item>
              <a-menu-item>
                <a
                  class="color-text"
                  href="https://gitee.com/1056811341/xy-admin"
                  target="_blank"
                >
                  Gitee
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-tooltip title="设置">
          <action-button @click="handleConfig">
            <setting-outlined />
          </action-button>
        </a-tooltip>

        <a-dropdown :trigger="['click']">
          <action-button :style="{ height: '44px' }">
            <a-avatar
              :size="24"
              :src="userInfo?.avatar"
              class="mr-8-1 display-inline-flex justify-content-center"
            />
            <span>{{ userInfo?.name }}</span>
          </action-button>
          <a-spin />
          <template #overlay>
            <a-menu>
              <a-menu-item
                key="logout"
                @click="handleLogout"
              >
                <login-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.basic-header {
  height: v-bind('`${config.headerHeight}px`');
  line-height: 1;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding-inline: 16px;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &__left {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__center {
    flex: auto;
    min-width: 0;
  }

  &__right {
    flex-shrink: 0;
    margin: 0 0 0 auto;
    display: flex;
    align-items: center;
  }

  :deep(.ant-menu-horizontal) {
    border: none;
    line-height: v-bind('`${config.headerHeight}px`');
  }

  &--light {
    background: #fff;
  }

  &--dark {
    color: #fff;

    :deep(.action-btn) {
      &:hover {
        background: #252a3d;
      }
    }
  }

  :deep(.basic-menu) {
    .basic-menu__title {
      .ant-badge {
        margin-top: -2px;
      }
    }
  }
}
</style>
