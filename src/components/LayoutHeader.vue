<template>
    <header class="x-layout-header">
        <div class="x-layout-header__left">
            <div class="x-layout-header__action">
                <component :is="collapsed ? 'icon-menu-unfold-outlined' : 'icon-menu-fold-outlined'"
                           @click="handleToggleCollapsed"></component>
            </div>
            <a-tooltip title="返回"
                       placement="bottom"
                       class="x-layout-header__action"
                       @click="$router.back()">
                <icon-rollback-outlined/>
            </a-tooltip>
        </div>
        <div class="x-layout-header__right">
            <div class="x-layout-header__action">
                <a-dropdown :trigger="['click']">
                    <div class="userinfo">
                        <!--<a-avatar class="mr-8-1">
                            <template #icon>
                                <user-outlined/>
                            </template>
                        </a-avatar>-->
                        <span v-if="isLogin">{{ userInfo.username }}</span>
                        <icon-down-outlined class="ml-8-1"/>
                    </div>
                    <a-spin/>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="logout"
                                         @click="handleLogout">
                                <icon-login-outlined></icon-login-outlined>
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
import {computed, toRefs, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {Modal} from 'ant-design-vue'

export default {
    name: 'LayoutHeader',
    props: {
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, {emit}) {
        const {collapsed} = toRefs(props)
        const store = useStore()
        const router = useRouter()
        const isLogin = computed(() => store.getters['user/isLogin'])
        const userInfo = computed(() => store.getters['user/userInfo'])

        const handleLogout = () => {
            Modal.confirm({
                title: '注销登录？',
                okText: '确认',
                cancelText: '取消',
                centered: true,
                onOk: () => {
                    store.dispatch('user/logout').then(() => {
                        router.push({
                            name: 'login',
                        })
                    })
                },
            })
        }

        const handleToggleCollapsed = () => {
            emit('update:collapsed', !collapsed.value)
        }

        return {
            isLogin,
            userInfo,
            handleLogout,
            handleToggleCollapsed,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-layout-header {
    display: flex;
    align-items: center;
    height: 100%;
    padding: @padding-md;

    &__left {
        display: flex;
        align-items: center;
        height: 100%;

        :deep(.ant-menu) {
            border-bottom: 0;
            height: 100%;
        }

        :deep(.ant-menu-horizontal) {
            line-height: 1;
        }

        :deep(.ant-menu-item),
        :deep(.ant-menu-submenu) {
            height: 100%;
            top: 0;
            margin: 0;
            display: inline-flex;
            align-items: center;
        }

        :deep(.ant-menu-submenu-title) {
            height: 100%;
            display: flex;
            align-items: center;
        }

        :deep(.ant-breadcrumb) {
            display: flex;
            align-items: center;
        }
    }

    &__right {
        margin-left: auto;
        display: flex;
        align-items: center;
        height: 100%;
    }

    &__action {
        min-width: @height-base;
        height: @height-base;
        padding: 0 @padding-md;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .3s;
        color: rgba(0, 0, 0, .65);
        border-radius: @border-radius-base;

        &:hover {
            background: rgba(0, 0, 0, .025);
        }

        :deep(.ant-badge-count) {
            line-height: 18px;
            min-width: 18px;
            height: 18px;
        }
    }

    .userinfo {
        display: flex;
        align-items: center;
        height: 100%;
        line-height: 1.3;
    }
}

</style>
