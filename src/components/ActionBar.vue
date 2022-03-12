<template>
    <a-card class="x-action-bar"
            :bordered="false"
            :class="classNames">
        <div class="x-action-bar__content">
            <slot></slot>
        </div>
        <div class="x-action-bar__extra">
            <slot name="extra"></slot>
        </div>
    </a-card>
</template>

<script>
import {computed, toRefs} from 'vue'

/**
 * 操作条
 * @property {string} type 类型，【default=默认，card=卡片】
 */
export default {
    name: 'ActionBar',
    props: {
        type: {
            type: String,
            default: 'default',
        },
    },
    setup(props) {
        const {type} = toRefs(props)

        const classNames = computed(() => {
            return {
                'x-action-bar--default': !type.value || 'default' === type.value,
                'x-action-bar--card': 'card' === type.value,
            }
        })

        return {
            classNames,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-action-bar {

    &--default {
        background: transparent;

        :deep(.ant-card-body) {
            padding: 0;
        }
    }

    :deep(.ant-card-body) {
        display: flex;
        align-items: center;
    }

    &__content,
    &__extra {
        > :deep(*) {
            &:not(:first-child) {
                margin-left: @margin-sm;
            }
        }
    }

    &__extra {
        margin: 0 0 0 auto;
    }
}
</style>
