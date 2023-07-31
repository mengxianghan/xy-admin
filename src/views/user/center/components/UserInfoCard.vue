<template>
    <a-card>
        <div class="align-center mb-8-3">
            <a-avatar
                class="mb-4-5"
                src="http://cdn.xuanyunet.com/images/avatar.jpg"
                :size="104"></a-avatar>
            <div class="fs-18 fw-600 mb-4-1">Serati Ma</div>
            <div>海纳百川，有容乃大</div>
        </div>
        <div class="mx-8-3">
            <p><idcard-outlined></idcard-outlined> 交互专家</p>
            <p><cluster-outlined></cluster-outlined> 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
            <p><home-outlined></home-outlined> 浙江省杭州市</p>
        </div>
        <a-divider></a-divider>
        <div class="mb-4-3">标签</div>
        <div
            class="display-flex flex-wrap-wrap"
            :style="{ gap: '8px' }">
            <a-tag
                v-for="item in tagList"
                :key="item">
                {{ item }}
            </a-tag>
        </div>
        <a-divider></a-divider>
        <div class="mb-4-3">团队</div>
        <a-row :gutter="[8, 24]">
            <a-col
                v-for="item in teamList"
                class="display-flex align-items-center"
                :lg="24"
                :xl="12"
                :key="item.id">
                <a-avatar
                    class="mr-4-3"
                    :style="{ backgroundColor: item.color, fontSize: '12px' }"
                    :size="24">
                    {{ item.name.slice(0, 1) }}
                </a-avatar>
                {{ item.name }}
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import { ClusterOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'UserInfoCard',
})

const tagList = ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']

const teamList = [
    {
        id: 1,
        name: '科学搬砖组',
        color: '#00acf4',
    },
    {
        id: 2,
        name: '都是吴彦祖',
        color: '#e51039',
    },
    {
        id: 3,
        name: '中二少女团',
        color: '#eb602a',
    },
    {
        id: 4,
        name: '程序员日常',
        color: '#00101e',
    },
    {
        id: 5,
        name: '高逼格设计',
        color: '#7e52b5',
    },
    {
        id: 6,
        name: '骗你来学前端',
        color: '#1ed7fd',
    },
]
</script>

<style lang="less" scoped></style>
