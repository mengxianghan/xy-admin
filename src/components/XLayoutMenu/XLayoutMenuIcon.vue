<template>
    <component :is="name"
               v-bind="$attrs"></component>
</template>

<script>
import {AppstoreOutlined, DashboardOutlined, HomeOutlined} from '@ant-design/icons-vue';

export default {
    name: 'XIcon',
    components: {
        AppstoreOutlined,
        DashboardOutlined,
        HomeOutlined
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup() {
    }
};
</script>

<style lang="scss"
       scoped>

</style>
