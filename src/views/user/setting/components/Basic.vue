<template>
    <a-row type="flex"
           :gutter="48">
        <a-col flex="0 0 480px">
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
        <a-col class="align-center">
            <div>
                <a-avatar :size="144"
                          src="https://joeschmoe.io/api/v1/random"></a-avatar>
            </div>
            <div class="mt-8-2">
                <a-upload>
                    <a-button>
                        <icon-upload :stroke-width="3"
                                     class="mr-4-1"></icon-upload>
                        上传头像
                    </a-button>
                </a-upload>
            </div>
        </a-col>
    </a-row>
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
