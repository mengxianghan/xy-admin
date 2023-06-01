<template>
    <div>
        <a-form>
            <a-result
                title="操作成功"
                :is-success="true"
                sub-title="预计两小时内到账">
                <div class="information">
                    <a-row>
                        <a-col
                            :sm="8"
                            :xs="24"
                            >付款账户：
                        </a-col>
                        <a-col
                            :sm="16"
                            :xs="24"
                            >****@***.com
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col
                            :sm="8"
                            :xs="24"
                            >收款账户：
                        </a-col>
                        <a-col
                            :sm="16"
                            :xs="24"
                            >test@example.com
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col
                            :sm="8"
                            :xs="24"
                            >收款人姓名：
                        </a-col>
                        <a-col
                            :sm="16"
                            :xs="24"
                            >辉夜
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col
                            :sm="8"
                            :xs="24"
                            >转账金额：
                        </a-col>
                        <a-col
                            :sm="16"
                            :xs="24"
                            ><span class="money">500</span> 元
                        </a-col>
                    </a-row>
                </div>
                <template #extra>
                    <a-space>
                        <a-button
                            type="primary"
                            @click="handleFinish"
                            >再转一笔
                        </a-button>
                        <a-button>查看账单</a-button>
                    </a-space>
                </template>
            </a-result>
        </a-form>
    </div>
</template>

<script setup>
defineOptions({
    name: 'Step3',
})

const emit = defineEmits(['finish'])

/**
 * 结束
 */
function handleFinish() {
    emit('finish')
}
</script>

<style lang="less" scoped></style>
