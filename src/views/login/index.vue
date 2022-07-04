<template>
    <div>
        <a-form :model="formState"
                :rules="rules"
                ref="formRef">
            <a-form-item name="username">
                <a-input v-model:value="formState.username"
                         size="large"
                         placeholder="admin">
                    <template #prefix>
                        <icon-user-outlined></icon-user-outlined>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="password">
                <a-input v-model:value="formState.password"
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
                <a-button type="primary"
                          size="large"
                          block
                          :loading="loading"
                          @click="handleLogin">登录
                </a-button>
            </a-form-item>
        </a-form>
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
    setup() {
        const { formState, formRef, rules } = useForm()
        const appStore = useAppStore()
        const userStore = useUserStore()
        const routerStore = useRouterStore()
        const router = useRouter()
        const route = useRoute()
        const title = import.meta.env.VITE_TITLE
        const loading = ref(false)
        const redirect = computed(() => decodeURIComponent(route.query?.redirect ?? ''))

        rules.value = {
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
            formRef.value.validate()
                .then(async (values) => {
                    loading.value = true
                    const { code } = await userStore.login({
                        ...values,
                    }).catch(() => {
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
            rules,
            formState,
            formRef,
            title,
            loading,
            handleLogin,
        }
    },
}
</script>

<style lang="less" scoped>
</style>
