<template>
    <header class="x-layout-header">
        <div class="x-layout-header__left">
            <div class="x-layout-header__action">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="handleToggleCollapsed"/>
            </div>
            <a-tooltip title="返回"
                       placement="bottom"
                       class="x-layout-header__action"
                       @click="$router.back()">
                <a-icon type="rollback"/>
            </a-tooltip>
        </div>
        <div class="x-layout-header__right">
            <!--<div class="x-layout-header__action">
                <a-badge count="5">
                    <a-icon type="bell"></a-icon>
                </a-badge>
            </div>-->
            <div class="x-layout-header__action">
                <a-dropdown :trigger="['click']">
                    <div class="user-info">
                        <div v-if="isLogin">{{ userInfo.username }}</div>
                        <a-icon type="down"/>
                    </div>
                    <a-menu slot="overlay">
                        <a-menu-item key="logout"
                                     @click="handleLogout">
                            <a-icon type="logout"/>
                            退出登录
                        </a-menu-item>
                    </a-menu>
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
import {toRefs} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {Modal} from 'ant-design-vue';

export default {
    name: 'XLayoutHeader',
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
        const isLogin = store.getters['user/isLogin'];
        const userInfo = store.getters['user/userInfo'];

        const handleLogout = () => {
            Modal.confirm({
                title: '注销登录？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    store.dispatch('user/logout');
                    router.push({
                        name: 'login'
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

        .anticon {
            padding: 4px;
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

        .anticon {
            margin-left: 8px;
        }
    }
}
</style>
