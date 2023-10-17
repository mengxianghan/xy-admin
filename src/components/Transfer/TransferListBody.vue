<template>
    <scrollbar class="x-transfer-list-body">
        <transfer-list-item
            v-for="item in dataSource"
            :key="item[fieldNames.value]"
            :record="item"
            :direction="direction">
            <slot
                :record="item"
                :direction="direction"></slot>
        </transfer-list-item>
    </scrollbar>
</template>

<script setup>
import Scrollbar from '../Scrollbar/Scrollbar.vue'
import TransferListItem from './TransferListItem.vue'
import { useTransferInject } from './context'

defineProps({
    dataSource: {
        type: Array,
        default: () => [],
    },
    direction: {
        type: String,
    },
})

const { fieldNames } = useTransferInject()
</script>

<style lang="less" scoped>
.x-transfer-list-body {
    padding: 0 12px 12px;
    margin-top: 12px;
    flex: 1;
    height: 0;
}
</style>
