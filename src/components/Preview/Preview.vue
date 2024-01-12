<template>
    <a-modal
        width="100%"
        wrap-class-name="x-preview-wrap"
        destroy-on-close
        :open="open"
        :closable="false"
        :footer="false"
        :after-close="onAfterClose">
        <div
            class="x-preview__content"
            :style="cpContentStyle">
            <template v-if="cpFileType === 'image'">
                <img
                    ref="imgRef"
                    alt=""
                    class="x-preview__image"
                    :src="cpUrl"
                    :style="cpImageStyle"
                    @mousedown="onMoveStart" />
            </template>
            <template v-if="cpFileType === 'video'">
                <video
                    controls
                    :src="cpUrl"></video>
            </template>
            <template v-if="cpFileType === 'audio'">
                <audio
                    controls
                    :src="cpUrl"></audio>
            </template>
        </div>

        <div
            class="x-preview__btn x-preview__btn--close"
            @click="handleClose">
            <close-outlined></close-outlined>
        </div>

        <template v-if="cpShowPrevNextBtn">
            <!-- 上一个 -->
            <div
                class="x-preview__btn x-preview__btn--prev"
                :class="{
                    'x-preview__btn--disabled': cpPrevBtnDisabled,
                }"
                @click="handlePrev">
                <left-outlined></left-outlined>
            </div>
            <!-- 下一个 -->
            <div
                class="x-preview__btn x-preview__btn--next"
                :class="{
                    'x-preview__btn--disabled': cpNextBtnDisabled,
                }"
                @click="handleNext">
                <right-outlined></right-outlined>
            </div>
        </template>

        <!-- 操作按钮 -->
        <div class="x-preview__footer">
            <div class="x-preview__process">{{ cur + 1 }}/{{ urls.length }}</div>
            <div class="x-preview__actions">
                <template v-if="cpFileType === 'image'">
                    <!-- 缩小 -->
                    <div
                        class="x-preview__action"
                        :class="{
                            'x-preview__action--disabled': cpZoomOutBtnDisabled,
                        }"
                        @click="handleZoomOut">
                        <zoom-out-outlined />
                    </div>
                    <!-- 放大 -->
                    <div
                        class="x-preview__action"
                        @click="handleZoomIn">
                        <zoom-in-outlined />
                    </div>
                    <!-- 左旋转 -->
                    <div
                        class="x-preview__action"
                        @click="handleRotateLeft">
                        <rotate-left-outlined />
                    </div>
                    <!-- 右旋转 -->
                    <div
                        class="x-preview__action"
                        @click="handleRotateRight">
                        <rotate-right-outlined />
                    </div>
                </template>
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import { Modal as AModal } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

import {
    CloseOutlined,
    LeftOutlined,
    RightOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons-vue'

defineOptions({
    name: 'XPreview',
})

const props = defineProps({
    /**
     * 文件 url
     */
    urls: {
        type: Array,
        default: () => [],
    },
    /**
     * 当前显示
     */
    current: {
        type: Number,
        default: 0,
    },
    /**
     * 关闭后执行的回调函数
     */
    afterClose: {
        type: Function,
        default: () => {},
    },
})

const open = ref(false)
const scale = ref(1)
const rotate = ref(0)
const imgRef = ref()
const cur = ref(0)

const state = reactive({
    startLeft: 0,
    startTop: 0,
    startX: null,
    startY: null,
    left: 0,
    top: 0,
})

const cpContentStyle = computed(() => {
    if (cpFileType.value === 'image') {
        return {
            transform: `translate3d(${state.left}px, ${state.top}px, 0)`,
        }
    }
    return {}
})
const cpImageStyle = computed(() => ({
    transform: `scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg)`,
}))
const cpUrl = computed(() => props.urls?.[cur.value])
const cpShowPrevNextBtn = computed(() => props.urls.length > 1)
const cpZoomOutBtnDisabled = computed(() => scale.value <= 1)
const cpPrevBtnDisabled = computed(() => cur.value <= 0)
const cpNextBtnDisabled = computed(() => cur.value >= props.urls.length - 1)
const cpFileType = computed(() => {
    const suffix = cpUrl.value.slice(cpUrl.value.lastIndexOf('.') + 1).toLowerCase()
    if (['mp4'].includes(suffix)) {
        return 'video'
    }
    if (['mp3'].includes(suffix)) {
        return 'audio'
    }
    return 'image'
})

init()

/**
 * 初始化
 */
function init() {
    const urlsLen = props.urls.length
    cur.value = props.current < urlsLen - 1 ? props.current : props.current % urlsLen
}

/**
 * 打开
 */
function handleOpen() {
    open.value = true
}

/**
 * 关闭
 */
function handleClose() {
    open.value = false
}

/**
 * 上一个
 */
function handlePrev() {
    if (cpPrevBtnDisabled.value) return
    cur.value -= 1
}

/**
 * 下一个
 */
function handleNext() {
    if (cpNextBtnDisabled.value) return
    cur.value += 1
}

/**
 * 放大
 */
function handleZoomIn() {
    scale.value += 1
}

/**
 * 缩小
 */
function handleZoomOut() {
    if (cpZoomOutBtnDisabled.value) return
    if (scale.value <= 1) return
    scale.value -= 1
}

/**
 * 左旋转
 */
function handleRotateLeft() {
    rotate.value -= 90
}

/**
 * 右旋转
 */
function handleRotateRight() {
    rotate.value += 90
}

/**
 * 关闭后
 */
function onAfterClose() {
    props.afterClose?.()
}

/**
 * 开始移动
 * @param {HTMLElement} e
 */
function onMoveStart(e) {
    e.preventDefault()
    state.startX = e.pageX
    state.startY = e.pageY

    window.addEventListener('mousemove', onMoving)
    window.addEventListener('mouseup', onMoveEnd)
}

/**
 * 移动中
 * @param {HTMLElement} e
 */
function onMoving(e) {
    const offsetX = e.pageX - state.startX
    const offsetY = e.pageY - state.startY

    state.left = state.startLeft + offsetX
    state.top = state.startTop + offsetY
}

/**
 * 移动结束
 */
function onMoveEnd() {
    state.startLeft = state.left
    state.startTop = state.top
    window.removeEventListener('mousemove', onMoving)
    window.removeEventListener('mouseup', onMoveEnd)
}

defineExpose({
    open,
    handleOpen,
})
</script>

<style lang="less">
.x-preview-wrap {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: 100vh;
        max-height: none;
        background: transparent;
        border-radius: 0;
        padding: 0;
    }

    .ant-modal-body {
        flex: 1;
        padding: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        user-select: none;
    }
}
</style>

<style lang="less" scoped>
.x-preview {
    &__content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__btn {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.1);
        transition: all @motion-duration-mid;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        border-radius: 50%;
        position: fixed;

        &:not(.x-preview__btn--disabled):hover {
            background: rgba(0, 0, 0, 0.2);
        }

        &--disabled {
            background: transparent;
            cursor: not-allowed;
            color: @color-text-disabled;
        }

        &--prev,
        &--next {
            top: 50%;
            transform: translate(0, -50%);
        }

        &--prev {
            left: 16px;
        }

        &--next {
            right: 16px;
        }

        &--close {
            right: 32px;
            top: 32px;
        }
    }

    &__image {
        transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        cursor: grab;
        max-width: 100%;
        max-height: 100%;
    }

    &__footer {
        position: fixed;
        inset-inline: 0;
        bottom: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__actions {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10em;
        padding-inline: 24px;
        gap: 12px;
    }

    &__process {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 16px;
    }

    &__action {
        padding: 12px;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.65);
        transition: all @motion-duration-mid;
        cursor: pointer;

        &:not(.x-preview__action--disabled):hover {
            color: #fff;
        }

        &--disabled {
            color: rgba(255, 255, 255, 0.25);
            cursor: not-allowed;
        }
    }
}
</style>
