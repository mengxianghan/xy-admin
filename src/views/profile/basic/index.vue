<template>
    <a-page-header
        main
        title="基础详情页"
        :ghost="false">
    </a-page-header>
    <a-card>
        <a-descriptions title="退款申请">
            <a-descriptions-item label="取货单号">1000000000</a-descriptions-item>
            <a-descriptions-item label="状态">已取货</a-descriptions-item>
            <a-descriptions-item label="销售单号">1234123421</a-descriptions-item>
            <a-descriptions-item label="子订单">3214321432</a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <a-descriptions title="用户信息">
            <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
            <a-descriptions-item label="联系电话">18100000000</a-descriptions-item>
            <a-descriptions-item label="常用快递">菜鸟仓储</a-descriptions-item>
            <a-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
            <a-descriptions-item label="备注">无</a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <h3>退货商品</h3>
        <a-table
            row-key="id"
            :columns="goodsColumns"
            :data-source="goodsList"
            :pagination="false">
            <template #summary>
                <a-table-summary>
                    <a-table-summary-row class="fw-600">
                        <a-table-summary-cell
                            :index="0"
                            :col-span="4">
                            总计
                        </a-table-summary-cell>
                        <a-table-summary-cell
                            class="align-right"
                            :index="1">
                            10
                        </a-table-summary-cell>
                        <a-table-summary-cell
                            class="align-right"
                            :index="2">
                            61.5
                        </a-table-summary-cell>
                    </a-table-summary-row>
                </a-table-summary>
            </template>
        </a-table>
        <h3 class="mt-8-3">退货进度</h3>
        <a-table
            row-key="id"
            :columns="progressColumns"
            :data-source="progressList"
            :pagination="false">
            <template #bodyCell="{ text, column }">
                <template v-if="column.key === 'key3'">
                    <a-badge
                        v-if="text === 1"
                        status="processing"
                        text="进行中" />
                    <a-badge
                        v-if="text === 2"
                        status="success"
                        text="成功" />
                </template>
            </template>
        </a-table>
    </a-card>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'profileBasic',
})

const goodsColumns = [
    { title: '商品编号', dataIndex: 'key1' },
    { title: '商品名称', dataIndex: 'key2' },
    { title: '商品条码', dataIndex: 'key3' },
    { title: '单价', dataIndex: 'key4', align: 'right' },
    { title: '数量（件）', dataIndex: 'key5', align: 'right' },
    { title: '金额', dataIndex: 'key6', align: 'right' },
]
const goodsList = ref([
    {
        id: 1,
        key1: '1234561',
        key2: '矿泉水 550ml',
        key3: '12421432143214321',
        key4: '2.00',
        key5: '1',
        key6: '2.00',
    },
    {
        id: 2,
        key1: '1234562',
        key2: '凉茶 300ml',
        key3: '12421432143214322',
        key4: '3.00',
        key5: '2',
        key6: '6.00',
    },
    {
        id: 3,
        key1: '1234563',
        key2: '好吃的薯片',
        key3: '12421432143214323',
        key4: '7.00',
        key5: '4',
        key6: '28.00',
    },
    {
        id: 4,
        key1: '1234564',
        key2: '特别好吃的蛋卷',
        key3: '12421432143214324',
        key4: '8.50',
        key5: '3',
        key6: '25.50',
    },
])
const progressColumns = [
    { title: '时间', dataIndex: 'key1' },
    { title: '当前进度', dataIndex: 'key2' },
    { title: '状态', dataIndex: 'key3', key: 'key3' },
    { title: '操作员ID', dataIndex: 'key4' },
    { title: '耗时', dataIndex: 'key5' },
]
const progressList = ref([
    { id: 1, key1: '2017-10-01 14:10', key2: '联系客户', key3: 1, key4: '取货员 ID1234', key5: '5mins' },
    { id: 2, key1: '2017-10-01 14:05', key2: '取货员出发', key3: 2, key4: '取货员 ID1234', key5: '1h' },
    { id: 3, key1: '2017-10-01 13:05', key2: '取货员接单', key3: 2, key4: '取货员 ID1234', key5: '5mins' },
    { id: 4, key1: '2017-10-01 13:00', key2: '申请审批通过', key3: 2, key4: '系统', key5: '1h' },
    { id: 5, key1: '2017-10-01 12:00', key2: '发起退货申请', key3: 2, key4: '用户', key5: '5mins' },
])
</script>

<style lang="less" scoped></style>
