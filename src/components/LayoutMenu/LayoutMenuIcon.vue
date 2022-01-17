<template>
    <component :is="`Icon${name}`"
               v-bind="$attrs"></component>
</template>

<script>
export default {
    name: 'LayoutMenuIcon',
    props: {
        name: {
            type: String,
            default: '',
        },
    },
    setup() {
    },
}
</script>

<style lang="less"
       scoped>

</style>
