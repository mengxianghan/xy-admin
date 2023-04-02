<template>
    <a-list
        item-layout="horizontal"
        row-key="id"
        :data-source="list">
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a>绑定</a>
                </template>
                <a-list-item-meta>
                    <template #avatar>
                        <a-avatar
                            shape="square"
                            :size="48"
                            :style="{
                                backgroundColor: item.color,
                            }">
                            <template #icon>
                                <component :is="item.avatar"></component>
                            </template>
                        </a-avatar>
                    </template>
                    <template #title>{{ item.title }}</template>
                    <template #description>{{ item.description }}</template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
import { TaobaoOutlined, AlipayOutlined, DingdingOutlined } from '@ant-design/icons-vue'

export default {
    name: 'Bind',
    setup() {
        const list = [
            { id: '1', title: '绑定淘宝', description: '当前未绑定淘宝账号', avatar: TaobaoOutlined, color: '#ff5800' },
            {
                id: '2',
                title: '绑定支付宝',
                description: '当前未绑定支付宝账号',
                avatar: AlipayOutlined,
                color: '#1677ff',
            },
            {
                id: '3',
                title: '绑定钉钉',
                description: '当前未绑定钉钉账号',
                avatar: DingdingOutlined,
                color: '#007fff',
            },
        ]

        return {
            list,
        }
    },
}
</script>

<style lang="less" scoped></style>
