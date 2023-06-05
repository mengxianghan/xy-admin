<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="自定义框架"
            @back="() => null" />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
defineOptions({
    name: 'CustomLayout',
})
</script>

<style lang="less" scoped>
.content {
    width: 1000px;
    margin: 0 auto;
    padding: 16px;
}
</style>
