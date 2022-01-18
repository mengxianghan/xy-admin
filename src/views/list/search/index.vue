<template>
    <a-card>
        <x-filter label-width="100px">
            <x-filter-item label="类目">
                <a-checkable-tag>全部</a-checkable-tag>
            </x-filter-item>
            <x-filter-item label="价格区间">
                <a-space>
                    <a-input-number></a-input-number>
                    <span>~</span>
                    <a-input-number></a-input-number>
                </a-space>
            </x-filter-item>
        </x-filter>
    </a-card>
</template>

<script>
export default {
    name: 'listSearch',
    setup() {
    },
}
</script>

<style scoped>

</style>
