<template>
    <div class="user-layout-container">
        <div class="user-layout-content">
            <div class="user-layout-top">
                <div class="user-layout-header">
                    <img :src="require('@/assets/images/logo.png')">
                    <h1>{{ title }}</h1>
                </div>
                <div class="user-layout-desc">
                    欢迎使用{{ title }}
                </div>
            </div>
            <div class="user-layout-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseLayout',
    setup() {
        const title = process.env.VUE_APP_TITLE
        return {
            title
        }
    }
}
</script>

<style lang="scss"
       scoped>
.user-layout {
    &-container {
        min-height: 100%;
        background: #f0f2f5 url('/images/login_bg.svg') no-repeat center;
        background-size: cover;
    }

    &-content {
        padding: 72px 0 24px;
    }

    &-top {
        text-align: center;
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 44px;
            margin-right: 16px;
        }

        h1 {
            font-size: 30px;
            font-weight: 500;
            margin: 0;
        }
    }

    &-desc {
        margin: 12px 0 48px;
    }

    &-main {
        width: 368px;
        margin: 0 auto;
    }
}
</style>
