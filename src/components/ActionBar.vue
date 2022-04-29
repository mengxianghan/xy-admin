<template>
    <div class="x-action-bar">
        <a-space v-bind="$attrs">
            <slot></slot>
        </a-space>
        <a-space v-bind="$attrs"
                 v-if="$slots.extra"
                 class="x-action-bar__extra">
            <slot name="extra"></slot>
        </a-space>
    </div>
</template>

<script>
export default {
    name: 'XActionBar'
}
</script>

<style lang="less"
       scoped>
.x-action-bar {
    display: flex;
    margin-bottom: 12px;

    &__extra {
        margin: 0 0 0 auto;
    }
}
</style>
