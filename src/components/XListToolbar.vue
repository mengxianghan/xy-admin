<template>
    <div class="x-list-toolbar">
        <div class="x-list-toolbar__content">
            <slot></slot>
        </div>
        <div class="x-list-toolbar__extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XToolbarTable',
    setup() {
    }
}
</script>

<style lang="scss"
       scoped>
.x-list-toolbar {
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
