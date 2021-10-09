<template>
    <header class="x-layout-header">
        <div class="x-layout-header__left">
            <div class="x-layout-header__action">
                <component :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
                           @click="handleToggleCollapsed"></component>
            </div>
            <a-tooltip title="返回"
                       placement="bottom"
                       class="x-layout-header__action"
                       @click="$router.back()">
                <rollback-outlined/>
            </a-tooltip>
        </div>
        <div class="x-layout-header__right">
            <div class="x-layout-header__action">
                <a-dropdown :trigger="['click']">
                    <div class="user-info">
                        <a-avatar>
                            <template #icon>
                                <user-outlined/>
                            </template>
                        </a-avatar>
                        <span v-if="isLogin">{{ userInfo.username }}</span>
                        <down-outlined/>
                    </div>
                    <a-spin/>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="logout"
                                         @click="handleLogout">
                                <login-outlined></login-outlined>
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
/**
 * @name XLayoutHeader
 * @description 顶部布局
 * @property {boolean} collapsed 左侧菜单收起状态
 */
import {computed, toRefs, ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {Modal} from 'ant-design-vue';
import {
    LoginOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RollbackOutlined,
    UserOutlined,
    BellOutlined
} from '@ant-design/icons-vue';

export default {
    name: 'XLayoutHeader',
    components: {
        LoginOutlined,
        DownOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        RollbackOutlined,
        UserOutlined,
        BellOutlined
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    setup(props, {emit}) {
        const {collapsed} = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const isLogin = computed(() => store.getters['user/isLogin']);
        const userInfo = computed(() => store.getters['user/userInfo']);

        const handleLogout = () => {
            Modal.confirm({
                title: '注销登录？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    store.dispatch('user/logout').then(() => {
                        router.push({
                            name: 'login'
                        });
                    });
                }
            });
        };

        const handleToggleCollapsed = () => {
            emit('update:collapsed', !collapsed.value);
        };

        return {
            isLogin,
            userInfo,
            handleLogout,
            handleToggleCollapsed
        };
    }
};
</script>

<style lang="scss"
       scoped>
.x-layout-header {
    display: flex;
    height: 100%;

    &__left {
        display: flex;
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
    }

    &__right {
        margin-left: auto;
        display: flex;
        height: 100%;
    }

    &__action {
        height: 100%;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .3s;
        color: rgba(0, 0, 0, .65);

        &:hover {
            background: rgba(0, 0, 0, .025);
        }

        :deep(.ant-badge-count) {
            line-height: 18px;
            min-width: 18px;
            height: 18px;
        }
    }

    .user-info {
        display: flex;
        align-items: center;
        height: 100%;
        line-height: 1.3;

        .ant-avatar {
            margin-right: 8px;
        }

        > .anticon {
            margin-left: 8px;
        }
    }
}
</style>
