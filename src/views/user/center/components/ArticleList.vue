<template>
    <a-list
        row-key="id"
        item-layout="vertical"
        :data-source="list">
        <template #renderItem="{ item }">
            <a-list-item key="item.title">
                <template #actions>
                    <span> <star-outlined></star-outlined> 113 </span>
                    <span> <like-outlined></like-outlined> 135 </span>
                    <span> <message-outlined></message-outlined> 120 </span>
                </template>
                <a-list-item-meta>
                    <template #title>
                        <a>{{ item.title }}</a>
                    </template>
                    <template #description>
                        <a-tag
                            v-for="tag in item.tags"
                            :key="tag">
                            {{ tag }}
                        </a-tag>
                    </template>
                </a-list-item-meta>
                <div>{{ item.content }}</div>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'

export default {
    name: 'ArticleList',
    components: {
        StarOutlined,
        LikeOutlined,
        MessageOutlined,
    },
    setup() {
        const list = [
            {
                id: 1,
                title: 'Alipay',
                tags: ['Ant Design', '设计语言', '蚂蚁金服'],
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                content:
                    '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
                userName: '付小小',
                link: 'https://ant.design',
                time: '2023-04-02 11:57',
            },
            {
                id: 2,
                title: 'Angular',
                tags: ['Ant Design', '设计语言', '蚂蚁金服'],
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
                content:
                    '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
                userName: '付小小',
                link: 'https://ant.design',
                time: '2023-04-02 11:57',
            },
        ]

        return {
            list,
        }
    },
}
</script>

<style lang="less" scoped></style>
