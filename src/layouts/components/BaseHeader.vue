<template>
    <a-layout-header
        class="base-header"
        :class="cpClassNames">
        <!-- 左侧 -->
        <div
            v-if="cpShowLeftSlot"
            class="base-header__left">
            <slot name="left"></slot>
        </div>
        <!-- 中间 -->
        <div
            v-if="cpShowDefaultSlot"
            class="base-header__center">
            <slot></slot>
        </div>
        <!-- 右侧 -->
        <div class="base-header__right">
            <a-dropdown :trigger="['click']">
                <action-button>
                    <a-avatar
                        class="mr-8-1"
                        :size="24">
                        <template #icon>
                            <icon-user-outlined />
                        </template>
                    </a-avatar>
                    <span v-if="cpIsLogin">{{ cpUserInfo.username }}</span>
                    <icon-down-outlined class="ml-8-1" />
                </action-button>
                <a-spin />
                <template #overlay>
                    <a-menu>
                        <a-menu-item
                            key="logout"
                            @click="handleLogout">
                            <icon-login-outlined></icon-login-outlined>
                            退出登录
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script>
import { computed } from 'vue'
import { useUserStore, useAppStore } from '@/store'
import { Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ActionButton from './ActionButton.vue'

/**
 * @property {string} theme 主题【light=亮色，dark=暗色】
 */
export default {
    name: 'BaseHeader',
    components: {
        ActionButton,
    },
    props: {
        theme: {
            type: String,
            default: 'light',
        },
    },
    setup(props, { slots }) {
        const userStore = useUserStore()
        const appStore = useAppStore()
        const router = useRouter()

        const { config } = storeToRefs(appStore)

        const cpClassNames = computed(() => ({
            [`base-header--${props.theme}`]: true,
        }))
        const cpShowLeftSlot = computed(() => !!slots.left)
        const cpShowDefaultSlot = computed(() => !!slots.default)
        const cpIsLogin = computed(() => userStore.isLogin)
        const cpUserInfo = computed(() => userStore.userInfo)

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

        return {
            config,
            cpClassNames,
            cpShowLeftSlot,
            cpShowDefaultSlot,
            cpIsLogin,
            cpUserInfo,
            handleLogout,
        }
    },
}
</script>

<style lang="less" scoped>
.base-header {
    height: v-bind('config.header.height + "px"');
    line-height: 1;
    z-index: 110;
    position: sticky;
    padding: 0;
    top: 0;
    display: flex;
    align-items: center;

    &__left {
        margin-right: @margin-lg;
    }

    &__center {
    }

    &__right {
        margin: 0 0 0 auto;
    }

    :deep(.ant-menu-horizontal) {
        border: none;
        line-height: v-bind('config.header.height + "px"');
    }

    &--light {
        background: @layout-sider-background-light;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }

    &--dark {
        background: @layout-sider-background;
        color: #fff;
    }
}
</style>
