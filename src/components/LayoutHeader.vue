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
                    <div class="userinfo">
                        <a-avatar icon="user"
                                  class="mr-8-1"/>
                        <div v-if="isLogin">{{ userInfo.username }}</div>
                        <a-icon type="down"
                                class="ml-8-1"/>
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
import {mapGetters} from 'vuex'

export default {
    name: 'XLayoutHeader',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'user/isLogin',
            userInfo: 'user/userInfo'
        })
    },
    methods: {
        handleLogout() {
            this.$confirm({
                title: '注销登录？',
                okText: '确认',
                cancelText: '取消',
                centered: true,
                onOk: () => {
                    this.$store.dispatch('user/logout').then(() => {
                        this.$router.push({
                            name: 'login'
                        })
                    })
                }
            })
        },
        handleToggleCollapsed() {
            this.$emit('update:collapsed', !this.collapsed)
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-layout-header {
    display: flex;
    height: 100%;

    &__left {
        display: flex;
        height: 100%;

        ::v-deep {
            .ant-menu {
                border-bottom: 0;
                height: 100%;

                &-horizontal {
                    line-height: 1;
                }

                &-item,
                &-submenu {
                    height: 100%;
                    top: 0;
                    margin: 0;
                    display: inline-flex;
                    align-items: center;
                }

                &-submenu-title {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
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

        ::v-deep {
            .ant-badge-count {
                line-height: 18px;
                min-width: 18px;
                height: 18px;
            }
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
