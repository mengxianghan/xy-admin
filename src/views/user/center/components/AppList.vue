<template>
    <a-list :data-source="list"></a-list>
</template>

<script>
export default {
    name: 'AppList',
    setup() {
        const list = []

        return {
            list,
        }
    },
}
</script>

<style lang="less" scoped></style>
