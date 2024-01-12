<template>
    <div class="x-demo-box-container">
        <demo-box
            v-for="item in components"
            :key="item"
            :component="item"></demo-box>
    </div>
</template>

<script setup>
import DemoBox from './DemoBox.vue'

defineOptions({
    name: 'XDemoBoxGroup',
})

defineProps({
    components: {
        type: Array,
        default: () => [],
    },
})
</script>

<style lang="less" scoped>
.x-demo-box-container {
    max-width: 1000px;
    margin-inline: auto;
}
</style>
