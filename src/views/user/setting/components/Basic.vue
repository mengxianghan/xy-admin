<template>
    <a-row
        :gutter="48"
        type="flex">
        <a-col flex="0 0 480px">
            <a-form layout="vertical">
                <a-form-item label="邮箱">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="昵称">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="个人简介">
                    <a-textarea></a-textarea>
                </a-form-item>
                <a-form-item label="国家/地区">
                    <a-select></a-select>
                </a-form-item>
                <a-form-item label="所在省市">
                    <x-region></x-region>
                </a-form-item>
                <a-form-item label="街道地址">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="联系电话">
                    <a-space>
                        <a-input :style="{ width: '72px' }"></a-input>
                        <a-input :style="{ width: '214px' }"></a-input>
                    </a-space>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary">更新资料</a-button>
                </a-form-item>
            </a-form>
        </a-col>
        <a-col class="align-center">
            <div>
                <a-avatar
                    :size="144"
                    src="http://cdn.xuanyunet.com/images/avatar.jpg"></a-avatar>
            </div>
            <div class="mt-8-2">
                <a-upload :show-upload-list="false">
                    <a-button>
                        <template #icon>
                            <upload-outlined></upload-outlined>
                        </template>
                        上传头像
                    </a-button>
                </a-upload>
            </div>
        </a-col>
    </a-row>
</template>

<script setup>
import { UploadOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'Basic',
})
</script>

<style lang="less" scoped></style>
