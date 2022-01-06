<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
    data() {
        return {
            locale: zh_CN
        }
    }
}
</script>

<style>
</style>
