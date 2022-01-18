<template>
    <div>
        <div class="setting-title">基本设置</div>
        <a-row type="flex"
               :gutter="40">
            <a-col flex="0 0 400px">
                <a-form layout="vertical">
                    <a-form-item label="邮箱">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="昵称">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="个人介绍">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="地区">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="详细地址">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="手机号">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary">更新资料</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col>
                上传头像
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'Basic',
    setup() {
    },
}
</script>

<style scoped>

</style>
