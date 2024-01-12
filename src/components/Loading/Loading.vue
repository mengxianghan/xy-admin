<template>
    <div
        class="x-loading"
        :class="classComputed">
        <div
            v-if="mask"
            class="x-loading__mask"
            :style="maskStyle"></div>
        <div class="x-loading__content">
            <spin
                :spinning="true"
                :size="size">
                <template
                    v-if="icon"
                    #indicator>
                    <component :is="icon"></component>
                </template>
                <template #tip>
                    <template v-if="isString(description)">{{ description }}</template>
                    <component
                        v-else
                        :is="description"></component>
                </template>
            </spin>
        </div>
    </div>
</template>

<script setup>
import { Spin } from 'ant-design-vue'
import { computed } from 'vue'
import { isString } from '@/utils/is'

defineOptions({
    name: 'XLoading',
})

const props = defineProps({
    /**
     * 类型，默认：fullscreen【全屏：fullscreen，指令：directive】
     */
    type: {
        type: String,
        default: 'fullscreen',
    },
    /**
     * 大小，默认：default，可选：【小：small，默认：default，大：large】
     */
    size: {
        type: String,
        default: 'default',
    },
    /**
     * 自定义 icon
     */
    icon: {
        type: Object,
    },
    /**
     * 描述文字
     */
    description: {
        type: [String, Object],
        default: '',
    },
    /**
     * 是否显示遮罩
     */
    mask: {
        type: Boolean,
        default: true,
    },
    /**
     * 遮罩样式
     */
    maskStyle: {
        type: [String, Object],
        default: '',
    },
})

const classComputed = computed(() => {
    return {
        [`x-loading--${props.type}`]: true,
    }
})
</script>

<style lang="less" scoped>
.x-loading {
    &__mask {
        inset: 0;
        background: rgba(255, 255, 255, 0.45);
        z-index: 1000;
    }

    &__content {
        z-index: 1000;
    }

    &--fullscreen {
        .x-loading {
            &__mask {
                position: fixed;
            }

            &__content {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    &--directive {
        inset: 0;
        position: absolute;
        display: flex;

        .x-loading {
            &__mask {
                position: absolute;
            }

            &__content {
                width: 100%;
                inset: 0;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                max-height: 400px;
            }
        }
    }
}
</style>
