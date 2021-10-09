<template>
    <div>
        欢迎使用{{ title }}
    </div>
</template>

<script>
export default {
    name: 'home',
    setup() {
        const title = process.env.VUE_APP_TITLE;

        return {
            title
        };
    }
};
</script>

<style lang="scss"
       scoped>

</style>
