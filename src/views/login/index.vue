<template>
    <div>
        <a-tabs>
            <!-- 账号登录 -->
            <a-tab-pane
                key="account"
                tab="账号登录">
                <a-form
                    :model="formState"
                    :rules="formRules"
                    ref="formRef">
                    <a-form-item name="username">
                        <a-input
                            v-model:value="formState.username"
                            size="large"
                            placeholder="admin">
                            <template #prefix>
                                <icon-user-outlined></icon-user-outlined>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password">
                        <a-input
                            v-model:value="formState.password"
                            size="large"
                            type="password"
                            placeholder="123456"
                            @pressEnter="handleLogin">
                            <template #prefix>
                                <icon-lock-outlined></icon-lock-outlined>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            size="large"
                            block
                            :loading="loading"
                            @click="handleLogin"
                            >登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <!-- 手机号登录 -->
            <a-tab-pane
                key="phone"
                tab="手机号登录">
                <a-form
                    :model="formState"
                    :rules="formRules"
                    ref="formRef">
                    <a-form-item name="username">
                        <a-input
                            v-model:value="formState.username"
                            size="large"
                            placeholder="手机号码">
                            <template #prefix>
                                <icon-mobile-outlined></icon-mobile-outlined>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="msgCode">
                        <a-input
                            v-model:value="formState.password"
                            size="large"
                            placeholder="短信验证码"
                            @pressEnter="handleLogin">
                            <template #prefix>
                                <icon-lock-outlined></icon-lock-outlined>
                            </template>
                            <template #suffix>
                                <span class="cursor-pointer">获取验证码</span>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            size="large"
                            block
                            :loading="loading"
                            @click="handleLogin"
                            >登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <!-- 二维码登录 -->
            <a-tab-pane
                key="qrcode"
                tab="二维码登录"
                class="align-center">
                <x-qr-code
                    text="https://mengxianghan.github.io/xy-admin/demo/"
                    :size="240"></x-qr-code>
                <a-divider plain>
                    <div class="color-secondary">扫码后点击"确认"，即可完成登录</div>
                </a-divider>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAppStore, useUserStore, useRouterStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { message, Modal, notification } from 'ant-design-vue'
import { timeFix } from '@/utils'
import useForm from '@/hooks/useForm'

export default {
    name: 'login',
    setup() {
        const { formState, formRef, formRules } = useForm()
        const appStore = useAppStore()
        const userStore = useUserStore()
        const routerStore = useRouterStore()
        const router = useRouter()
        const route = useRoute()
        const loading = ref(false)
        const redirect = computed(() => decodeURIComponent(route.query?.redirect ?? ''))

        formRules.value = {
            username: { required: true, message: '请输入用户名' },
            password: { required: true, message: '请输入密码' },
        }

        onMounted(() => {
            // 清理登录信息
            userStore.logout()
        })

        /**
         * 登录
         * @return {Promise<void>}
         */
        async function handleLogin() {
            formRef.value.validate().then(async (values) => {
                loading.value = true
                const { code } = await userStore
                    .login({
                        ...values,
                    })
                    .catch(() => {
                        loading.value = false
                        message.error('登录失败')
                    })
                loading.value = false
                if (200 === code) {
                    // 加载完成
                    if (appStore.complete) {
                        goIndex()
                    } else {
                        await appStore.init()
                        goIndex()
                    }
                }
            })
        }

        /**
         * 获取首页路由
         * @return {*}
         */
        function getIndexRouter() {
            const indexRouter = routerStore.indexRouter
            if (!indexRouter) {
                Modal.warning({
                    title: '系统提示',
                    content: '没有任何权限，请联系系统管理员',
                    onOk: () => {
                        window.location.reload()
                    },
                })
            }
            return indexRouter
        }

        /**
         * 去首页
         */
        function goIndex() {
            if (redirect.value) {
                location.href = redirect.value
            } else {
                const indexRouter = getIndexRouter()
                if (!indexRouter) return
                router.push(indexRouter)
            }
            notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`,
            })
        }

        return {
            formRef,
            formRules,
            loading,
            formState,
            handleLogin,
        }
    },
}
</script>

<style lang="less" scoped>
:deep(.ant-tabs-tab) {
    font-size: 15px;
}
</style>
