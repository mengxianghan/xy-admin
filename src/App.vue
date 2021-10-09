<template>
    <a-config-provider :locale="locale">
        <router-view/>
    </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
    setup() {
        const locale = zhCN;
        return {
            locale
        };
    }
};
</script>

<style lang="scss">
</style>
