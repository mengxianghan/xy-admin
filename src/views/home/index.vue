<template>
    <div>
        欢迎使用{{ title }}
        <a-button @click="handleMsg">Message</a-button>
        <a-button @click="handleCloseMsg">关闭</a-button>
    </div>
</template>

<script>
import {onMounted} from 'vue'
import {loading} from '@/components/XLoading'

export default {
    name: 'home',
    setup() {
        const title = process.env.VUE_APP_TITLE

        onMounted(() => {

        })

        function handleMsg() {
            const load = loading({
                message: `初始化${Math.random()}`
            })

            console.log(load)
        }

        function handleCloseMsg() {
            loading.close()
        }

        return {
            title,
            handleMsg,
            handleCloseMsg
        }
    }
}
</script>

<style lang="less"
       scoped>

</style>
