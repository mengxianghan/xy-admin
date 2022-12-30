<template>
    <a-list item-layout="horizontal">
        <a-list-item>
            <template #actions>
                <a>修改</a>
            </template>
            <a-list-item-meta>
                <template #title>账户密码</template>
                <template #description>当前密码强度：强</template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <template #actions>
                <a>修改</a>
            </template>
            <a-list-item-meta>
                <template #title>密保手机</template>
                <template #description>已绑定手机：138****8293</template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <template #actions>
                <a>设置</a>
            </template>
            <a-list-item-meta>
                <template #title>密保问题</template>
                <template #description>未设置密保问题，密保问题可有效保护账户安全</template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <template #actions>
                <a>修改</a>
            </template>
            <a-list-item-meta>
                <template #title>备用邮箱</template>
                <template #description>已绑定邮箱：ant***sign.com</template>
            </a-list-item-meta>
        </a-list-item>
        <a-list-item>
            <template #actions>
                <a>绑定</a>
            </template>
            <a-list-item-meta>
                <template #title>MFA 设备</template>
                <template #description>未绑定 MFA 设备，绑定后，可以进行二次确认</template>
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script setup></script>

<style lang="less" scoped></style>
