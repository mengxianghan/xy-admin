<template>
    <div class="x-action-bar">
        <div class="x-action-bar__content">
            <slot></slot>
        </div>
        <div class="x-action-bar__extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XActionBar',
    setup() {
    }
}
</script>

<style lang="less"
       scoped>
.x-action-bar {
    display: flex;
    align-items: center;
    //padding: 16px;

    &__content,
    &__extra {
        > :deep(*) {
            margin-right: 8px;
        }
    }

    &__extra {
        margin: 0 0 0 auto;
    }
}
</style>
