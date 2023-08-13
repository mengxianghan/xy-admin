<template>
    <a-page-header
        :ghost="false"
        main
        title="单号：234231029431">
        <template #extra>
            <a-space>
                <a-button>操作一</a-button>
                <a-button>操作二</a-button>
                <a-dropdown>
                    <a-button>
                        <template #icon>
                            <ellipsis-outlined></ellipsis-outlined>
                        </template>
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>选项一</a-menu-item>
                            <a-menu-item>选项二</a-menu-item>
                            <a-menu-item>选项三</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <a-button type="primary">主操作</a-button>
            </a-space>
        </template>
        <a-row
            align="middle"
            type="flex">
            <a-col flex="1">
                <a-descriptions :column="2">
                    <a-descriptions-item label="创建人">曲丽丽</a-descriptions-item>
                    <a-descriptions-item label="订购产品">XX 服务</a-descriptions-item>
                    <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
                    <a-descriptions-item label="关联单据"><a>12421</a></a-descriptions-item>
                    <a-descriptions-item label="生效日期">2017-07-07 ~ 2017-08-08</a-descriptions-item>
                    <a-descriptions-item label="备注"> 请于两个工作日内确认</a-descriptions-item>
                </a-descriptions>
            </a-col>
            <a-col class="align-right pr-8-5">
                <a-space :size="40">
                    <a-statistic
                        title="状态"
                        value="待审批"></a-statistic>

                    <a-statistic
                        title="订单金额"
                        value="¥568.08"></a-statistic>
                </a-space>
            </a-col>
        </a-row>
        <template #footer>
            <a-tabs>
                <a-tab-pane
                    key="1"
                    tab="详情"></a-tab-pane>
                <a-tab-pane
                    key="2"
                    tab="规则"></a-tab-pane>
            </a-tabs>
        </template>
    </a-page-header>

    <a-card title="流程进度">
        <a-steps
            :current="1"
            class="mt-8-2"
            progress-dot>
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
    </a-card>

    <a-card
        class="mt-8-2"
        title="用户信息">
        <a-descriptions>
            <a-descriptions-item label="用户姓名">曲丽丽</a-descriptions-item>
            <a-descriptions-item label="会员卡号">32943898021309809423</a-descriptions-item>
            <a-descriptions-item label="身份证">3321944288191034921</a-descriptions-item>
            <a-descriptions-item label="联系方式">18112345678</a-descriptions-item>
            <a-descriptions-item
                :span="2"
                label="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions
            class="mt-8-1"
            title="信息组">
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
        </a-descriptions>
        <h4 class="mt-8-1">信息组</h4>
        <a-card
            :body-style="{
                paddingLeft: '24px',
                paddingRight: '24px',
            }"
            size="small"
            title="多层级信息组">
            <a-descriptions
                class="mt-8-1"
                title="组名称">
                <a-descriptions-item label="负责人">林东东</a-descriptions-item>
                <a-descriptions-item label="角色码">1234567</a-descriptions-item>
                <a-descriptions-item label="所属部门">XX公司 - YY部</a-descriptions-item>
                <a-descriptions-item label="过期时间">2017-08-08</a-descriptions-item>
                <a-descriptions-item
                    :span="2"
                    label="描述">
                    这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                </a-descriptions-item>
            </a-descriptions>
            <a-divider class="mt-8-1"></a-divider>
            <a-descriptions
                :column="1"
                class="mt-8-1"
                title="组名称">
                <a-descriptions-item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                </a-descriptions-item>
            </a-descriptions>
            <a-divider class="mt-8-1"></a-divider>
            <a-descriptions
                class="mt-8-1"
                title="组名称">
                <a-descriptions-item label="负责人">林东东</a-descriptions-item>
                <a-descriptions-item label="角色码">1234567</a-descriptions-item>
            </a-descriptions>
        </a-card>
    </a-card>

    <a-card
        class="mt-8-2"
        title="用户近半年来电记录">
        <a-empty></a-empty>
    </a-card>

    <a-card
        :active-tab-key="activeTabKey"
        :tab-list="tabList"
        class="mt-8-2"
        @tabChange="(key) => (activeTabKey = key)">
        <a-empty :description="`暂无操作日志 ${activeTabKey}`"></a-empty>
    </a-card>
</template>

<script setup>
import { ref } from 'vue'

import { DingdingOutlined, EllipsisOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'profileAdvanced',
})

const tabList = [
    {
        key: '1',
        tab: '操作日志一',
    },
    {
        key: '2',
        tab: '操作日志二',
    },
    {
        key: '3',
        tab: '操作日志三',
    },
]

const activeTabKey = ref('1')
</script>

<style lang="less" scoped></style>
