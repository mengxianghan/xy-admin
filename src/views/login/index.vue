<template>
    <div>
        <a-form :model="formState"
                :rules="rules"
                ref="formRef">
            <a-form-item name="username">
                <a-input v-model:value="formState.username"
                         size="large"
                         placeholder="admin">
                    <a-icon slot="prefix"
                            type="user"/>
                </a-input>
            </a-form-item>
            <a-form-item name="password">
                <a-input v-model:value="formState.password"
                         size="large"
                         type="password"
                         placeholder="123456"
                         @pressEnter="handleLogin">
                    <a-icon slot="prefix"
                            type="lock"/>
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
import {ref, reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {message, Modal} from 'ant-design-vue'

import useForm from '@/hooks/useForm'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const {formState, formRef, rules} = useForm()
        const title = process.env.VUE_APP_TITLE
        const loading = ref(false)
        const redirect = computed(() => decodeURIComponent(route.query?.redirect ?? ''))

        rules.value = {
            username: {required: true, message: '请输入用户名'},
            password: {required: true, message: '请输入密码'},
        }

        formState.value = {
            username: 'admin',
            password: '123456',
        }

        /**
         * 登录
         * @return {Promise<void>}
         */
        async function handleLogin() {
            formRef.value.validate().then(async (values) => {
                try {
                    loading.value = true
                    const {code} = await store.dispatch('user/login', {
                        ...values,
                    }).catch(() => {
                        throw new Error('登录失败')
                    })
                    loading.value = false
                    if (code === '200') {
                        // 加载完成
                        if (store.getters['app/complete']) {
                            goIndex()
                        } else {
                            store.dispatch('app/init').then(() => {
                                goIndex()
                            })
                        }
                    }
                } catch (err) {
                    loading.value = false
                    message.error(err.message)
                }
            })
        }

        /**
         * 获取首页路由
         * @return {*}
         */
        function getIndexRouter() {
            const indexRouter = store.getters['router/indexRouter']
            if (!indexRouter) {
                Modal.warning({
                    title: '系统提示',
                    content: '没有任何权限，请联系系统管理员',
                    centered: true,
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

<style lang="less"
       scoped>
</style>
