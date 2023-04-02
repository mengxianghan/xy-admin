<template>
    <a-card :bordered="false">
        <div class="align-center mb-8-3">
            <a-avatar
                class="mb-4-5"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
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
                    :src="item.icon"
                    :size="24"></a-avatar>
                {{ item.name }}
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import { HomeOutlined, IdcardOutlined, ClusterOutlined } from '@ant-design/icons-vue'

export default {
    name: 'UserInfoCard',
    components: {
        HomeOutlined,
        IdcardOutlined,
        ClusterOutlined,
    },
    setup() {
        const tagList = ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']

        const teamList = [
            { id: 1, name: '科学搬砖组', icon: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png' },
            {
                id: 2,
                name: '全组都是吴彦祖',
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            },
            { id: 3, name: '中二少女团', icon: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png' },
            { id: 4, name: '程序员日常', icon: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png' },
            {
                id: 5,
                name: '高逼格设计天团',
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
            },
            {
                id: 6,
                name: '骗你来学计算机',
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
            },
        ]

        return {
            tagList,
            teamList,
        }
    },
}
</script>

<style lang="less" scoped></style>
