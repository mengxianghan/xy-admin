<template>
    <a-list item-layout="horizontal"
            :data-source="list"></a-list>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'Message',
    setup() {
        const list = ref([])

        return {
            list,
        }
    },
}
</script>

<style scoped>

</style>
