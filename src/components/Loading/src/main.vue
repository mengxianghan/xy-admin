<template>
    <div v-if="visible"
         class="x-loading">
        <a-spin :spinning="true"
                size="large"
                :tip="message"></a-spin>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            message: '加载中'
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-loading {
    position: fixed;
    z-index: 1000;
    background: rgba(255, 255, 255, .65);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: saturate(180%) blur(6px);

    ::v-deep {
        .ant-spin-text {
            margin-top: 12px;
        }
    }
}
</style>
