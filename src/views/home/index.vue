<template>
    <div>
        欢迎使用{{ title }}
    </div>
</template>

<script>
import {onMounted} from 'vue'

export default {
    name: 'home',
    setup() {
        const title = process.env.VUE_APP_TITLE

        onMounted(() => {
        })

        return {
            title,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
