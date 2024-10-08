<template>
    <div
        ref="infiniteScrollRef"
        class="x-infinite-scroll"
        @scroll="check">
        <div class="x-infinite-scroll__body">
            <slot></slot>
        </div>
        <div class="x-infinite-scroll__footer">
            <div
                v-if="loading"
                class="x-infinite-scroll__text">
                <slot name="loading">
                    {{ loadingText }}
                </slot>
            </div>
            <div
                v-if="finished"
                class="x-infinite-scroll__text">
                <slot name="finished">
                    {{ finishedText }}
                </slot>
            </div>
            <div
                v-if="error"
                class="x-infinite-scroll__text x-infinite-scroll__text--error"
                @click="handleError">
                <slot name="error">
                    {{ errorText }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

defineOptions({
    name: 'XInfiniteScroll',
})

const props = defineProps({
    /**
     * 加载过程中的提示文案
     */
    loadingText: {
        type: String,
        default: '正在努力加载',
    },
    /**
     * 是否已加载完成，加载完成后不再触发 load 事件
     */
    finished: {
        type: Boolean,
        default: false,
    },
    /**
     * 加载完成后的提示文案
     */
    finishedText: {
        type: String,
        default: '没有更多了',
    },
    /**
     * 加载失败后的提示文案
     */
    errorText: {
        type: String,
        default: '加载失败，点击重新加载',
    },
    /**
     * 是否在初始化时立即执行滚动位置检查
     */
    immediateCheck: {
        type: Boolean,
        default: true,
    },
    /**
     * 滚动条与底部距离小于 distance 时触发 load 事件
     */
    distance: {
        type: Number,
        default: 30,
    },
})
const emits = defineEmits(['load'])
const loading = defineModel('loading', { type: Boolean, default: false })
const error = defineModel('error', { type: Boolean, default: false })

const infiniteScrollRef = ref()

watch(() => [loading.value, props.finished, error.value], check)

onMounted(() => {
    if (props.immediateCheck) {
        check()
    }
})

/**
 * 加载失败，点击重试
 */
function handleError() {
    error.value = false
    check()
}

function check() {
    nextTick(() => {
        if (loading.value || props.finished || error.value) return

        let isReach = false
        const clientHeight = infiniteScrollRef.value.clientHeight
        const scrollTop = infiniteScrollRef.value.scrollTop
        const scrollHeight = infiniteScrollRef.value.scrollHeight

        if (scrollHeight - clientHeight - scrollTop <= props.distance) {
            isReach = true
        }

        if (isReach) {
            loading.value = true
            emits('load')
        }
    })
}
</script>

<style lang="less" scoped>
.x-infinite-scroll {
    height: 100%;
    overflow: auto;

    &__text {
        padding-block: 8px;
        text-align: center;
        color: @color-text-placeholder;

        &--error {
            cursor: pointer;
        }
    }
}
</style>
