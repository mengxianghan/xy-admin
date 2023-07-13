<template>
    <a-card>
        <a-result status="error">
            <template #title>提交失败</template>
            <template #subTitle>请核对并修改以下信息后，再重新提交。</template>
            <template #extra>
                <a-button type="primary">返回修改</a-button>
            </template>

            <div>
                <p class="fs-16">
                    <strong>您提交的内容有如下错误：</strong>
                </p>
                <p class="display-flex align-items-center">
                    <close-circle-outlined class="mr-4-1 color-error" />
                    您的账户已被冻结
                    <a class="display-flex align-items-center ml-8-1"
                        >立即解冻
                        <right-outlined class="ml-4-1" />
                    </a>
                </p>
                <p class="display-flex align-items-center">
                    <close-circle-outlined class="mr-4-1 color-error" />
                    您的账户还不具备申请资格
                    <a class="display-flex align-items-center ml-8-1"
                        >立即升级
                        <right-outlined class="ml-4-1" />
                    </a>
                </p>
            </div>
        </a-result>
    </a-card>
</template>

<script setup>
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'resultFail',
})
</script>

<style lang="less" scoped></style>
