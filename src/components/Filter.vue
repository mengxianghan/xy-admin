<template>
    <div class="x-filter">
        <div class="x-filter__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {provide, toRefs} from 'vue'

export default {
    name: 'Filter',
    props: {
        labelWidth: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const {labelWidth} = toRefs(props)
        provide('labelWidth', labelWidth)
    },
}
</script>

<style scoped>

</style>
