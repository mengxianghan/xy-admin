<template>
    <a-card
            class="x-action-bar"
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
import { computed } from 'vue'

/**
 * 操作条
 * @property {string} type 类型，【default=默认，card=卡片】
 */
export default {
    name: 'XActionBar',
    props: {
        type: {
            type: String,
            default: 'default',
        },
    },
    setup(props) {
        const classNames = computed(() => {
            return {
                [`x-action-bar--${ props.type || 'default' }`]: true,
            }
        })

        return { classNames }
    },
}
</script>

<style lang="less" scoped>
.x-action-bar {
    &--default {
        background: transparent;
        border: none;

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

        :deep(.ant-form-inline .ant-form-item) {
            margin-bottom: 0 !important;
        }
    }

    &__extra {
        margin: 0 0 0 auto;
    }
}
</style>
