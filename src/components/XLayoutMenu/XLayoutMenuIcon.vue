<template>
    <component :is="name"
               v-bind="$attrs"></component>
</template>

<script>
import {AppstoreOutlined, DashboardOutlined, HomeOutlined, LinkOutlined, TableOutlined} from '@ant-design/icons-vue'

export default {
    name: 'XIcon',
    components: {
        AppstoreOutlined,
        DashboardOutlined,
        HomeOutlined,
        LinkOutlined,
        TableOutlined
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup() {
    }
}
</script>

<style lang="less"
       scoped>

</style>
