<template>
    <div>
        <a-form-model :model="form"
                      ref="form"
                      :rules="rules">
            <a-form-item prop="username">
                <a-input v-model="form.username"
                         size="large">
                    <a-icon slot="prefix"
                            type="user"/>
                </a-input>
            </a-form-item>
            <a-form-item prop="password">
                <a-input v-model="form.password"
                         size="large"
                         type="password"
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
        </a-form-model>
    </div>
</template>

<script>
import form from '@/mixins/form'

export default {
    mixins: [form],
    data() {
        const rules = {
            username: {required: true, message: '请输入用户名'},
            password: {required: true, message: '请输入密码'},
        }
        return {
            rules,
            loading: false,
        }
    },
    computed: {
        redirect() {
            return decodeURIComponent(this.$route.query?.redirect ?? '')
        },
    },
    methods: {
        /**
         * 登录
         */
        async handleLogin() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        const {form} = this
                        this.loading = true
                        const {code} = await this.$store.dispatch('user/login', {
                            ...form,
                        }).catch(() => {
                            throw new Error('登录失败')
                        })
                        this.loading = false
                        if (code === '200') {
                            // 加载完成
                            if (this.$store.getters['app/complete']) {
                                this.next()
                            } else {
                                this.$store.dispatch('app/init').then(() => {
                                    this.next()
                                })
                            }
                        }
                    } catch (err) {
                        this.loading = false
                        this.$message.error(err.message)
                    }
                }
            })
        },
        /**
         * 获取首页路由
         * @return {*}
         */
        getIndexRouter() {
            const indexRouter = this.$store.getters['router/indexRouter']
            if (!indexRouter) {
                this.$warning({
                    title: '系统提示',
                    content: '没有任何权限，请联系系统管理员',
                    centered: true,
                    onOk: () => {
                        window.location.reload()
                    },
                })
                return ''
            }
            return indexRouter
        },
        /**
         * 去首页
         */
        next() {
            const {redirect} = this
            if (redirect) {
                location.href = redirect
            } else {
                const indexRouter = this.getIndexRouter()
                if (!indexRouter) return
                this.$router.push(indexRouter)
            }
        },
    },
}
</script>

<style lang="less"
       scoped>
</style>
