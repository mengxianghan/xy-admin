<template>
    <div>
        <a-result status="404"
                  title="404"
                  sub-title="对不起，您访问的页面不存在。">
            <template #extra>
                <a-button type="primary"
                          @click="handleBack">
                    返回
                </a-button>
            </template>
        </a-result>
    </div>
</template>

<script>
export default {
    methods: {
        /**
         * 返回
         */
        handleBack() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>

</style>
