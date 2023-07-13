<template>
    <a-card>
        <a-result status="success">
            <template #title>提交成功</template>
            <template #subTitle
                >提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。
                本文字区域可以展示简单的补充说明，如果有类似展示
                “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</template
            >
            <template #extra>
                <a-space>
                    <a-button type="primary">返回列表</a-button>
                    <a-button>查看项目</a-button>
                    <a-button>打印</a-button>
                </a-space>
            </template>
            <div>
                <a-descriptions title="项目名称">
                    <a-descriptions-item label="项目 ID">12345</a-descriptions-item>
                    <a-descriptions-item label="负责人">张三</a-descriptions-item>
                    <a-descriptions-item label="生效时间">2016-12-12 ~ 2017-12-12</a-descriptions-item>
                </a-descriptions>
                <a-steps
                    progress-dot
                    :current="1"
                    class="mt-8-2">
                    <a-step title="创建项目">
                        <template #description>
                            <div class="mt-8-1 fs-12">
                                <div>
                                    曲丽丽
                                    <dingding-outlined />
                                </div>
                                <div>2016-12-12 12:32</div>
                            </div>
                        </template>
                    </a-step>
                    <a-step title="部门初审">
                        <template #description>
                            <div class="mt-8-1 fs-12">
                                <div>
                                    周毛毛
                                    <dingding-outlined class="color-primary" />
                                </div>
                                <div class="color-primary">催一下</div>
                            </div>
                        </template>
                    </a-step>
                    <a-step title="财务复核"></a-step>
                    <a-step title="完成"></a-step>
                </a-steps>
            </div>
        </a-result>
    </a-card>
</template>

<script setup>
import { DingdingOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'resultSuccess',
})
</script>

<style lang="less" scoped></style>
