<template>
    <div class="user-layout-container">
        <div class="user-layout-aside">
            <div class="aside-header">
                <h1>{{title}}</h1>
            </div>
            <div class="aside-body">
                <img :src="LoginWelcome">
                <h3>高性能 / 精致 / 优雅</h3>
                <p>基于Vue3 + Ant Design Vue 的中后台前端解决方案。</p>
            </div>
            <div class="aside-footer">
                <p>© {{title}} {{version}}</p>
            </div>
        </div>
        <div class="user-layout-main">
            <div class="user-layout-content">
                <div class="user-layout-top">
                    <div class="user-layout-header">登录</div>
                    <div class="user-layout-desc">
                        欢迎使用{{ title }}
                    </div>
                </div>
                <div class="user-layout-form">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginWelcome from '@/assets/login_welcome.svg'

export default {
    name: 'BaseLayout',
    setup() {
        const title = import.meta.env.VITE_TITLE
        const { version } = __APP_INFO__
        return {
            LoginWelcome,
            title,
            version
        }
    },
}
</script>

<style lang="less" scoped>
.user-layout {
    &-container {
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: center 110px;
        background-size: 100%;
        display: flex;
    }

    &-aside {
        width: 538px;
        flex: 0 0 538px;
        display: flex;
        flex-direction: column;
        background: #235bda url('@/assets/login_aside_bg.jpg') no-repeat left top / 100% auto;
        position: relative;

        .aside {
            &-header {
                display: flex;
                flex-direction: column;
                padding: 48px;

                h1 {
                    font-size: 20px;
                    font-weight: 500;
                    color: #fff;
                }
            }

            &-body {
                flex: 1;
                text-align: center;
                padding: 48px 0 0;

                img {
                    width: 80%;
                }

                h3 {
                    color: #fff;
                }

                p {
                    color: rgba(255, 255, 255, .85);
                }
            }

            &-footer {
                color: rgba(255, 255, 255, .65);
                font-size: 12px;
                padding: 48px;
            }
        }
    }

    &-main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 64px 0 144px;
    }

    &-content {
        width: 368px;
        height: 440px;
    }

    &-header {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 500;
    }

    &-desc {
        margin: 8px 0 24px;
    }
}
</style>
