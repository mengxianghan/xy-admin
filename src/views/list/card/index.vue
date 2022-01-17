<template>
    <a-list :grid="{gutter: 16, column: 4}"
            :data-source="list">
        <template #renderItem="{item}">
            <a-list-item>
                <a-card hoverable>
                    <a-card-meta :title="item.title">
                        <template #avatar>
                            <a-avatar :src="item.avatar"/>
                        </template>
                        <template #description>
                            <a-typography-paragraph :ellipsis="{rows: 3}">
                                {{item.desc}}
                            </a-typography-paragraph>
                        </template>
                    </a-card-meta>
                    <template #actions>
                        <icon-setting-outlined key="setting"/>
                        <icon-edit-outlined key="edit"/>
                        <icon-ellipsis-outlined key="ellipsis"/>
                    </template>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from 'vue'

export default {
    name: 'listCard',
    setup() {
        const {$api} = getCurrentInstance().appContext.config.globalProperties
        const list = ref([])

        /**
         * 获取分页列表
         */
        const getPageList = async () => {
            try {
                const {code, data} = await $api.data.getPageList()
                if ('200' === code) {
                    list.value = data.list
                }
            } catch (err) {

            }
        }

        onMounted(() => {
            getPageList()
        })

        return {
            list,
        }
    },
}
</script>

<style scoped>

</style>