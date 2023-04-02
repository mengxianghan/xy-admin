<template>
    <a-list
        item-layout="horizontal"
        row-key="id"
        :data-source="list">
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a>修改</a>
                </template>
                <a-list-item-meta>
                    <template #title>{{ item.title }}</template>
                    <template #description>{{ item.description }}</template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
export default {
    name: 'Safe',
    setup() {
        const list = [
            { id: '1', title: '账户密码', description: '当前密码强度：强' },
            { id: '2', title: '密保手机', description: '已绑定手机：188****2636' },
            { id: '3', title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全' },
            { id: '4', title: '备用邮箱', description: '已绑定邮箱：ant***sign.com' },
            { id: '5', title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认' },
        ]

        return {
            list,
        }
    },
}
</script>

<style lang="less" scoped></style>
