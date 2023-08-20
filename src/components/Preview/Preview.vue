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

        <template v-if="cpShowPrevNextBtn">
            <!-- 上一个 -->
            <div
                class="x-preview__action-btn x-preview__prev-btn"
                :class="{
                    'x-preview__action-btn--disabled': cpPrevBtnDisabled,
                }"
                @click="handlePrev">
                <left-outlined></left-outlined>
            </div>
            <!-- 下一个 -->
            <div
                class="x-preview__action-btn x-preview__next-btn"
                :class="{
                    'x-preview__action-btn--disabled': cpNextBtnDisabled,
                }"
                @click="handleNext">
                <right-outlined></right-outlined>
            </div>
        </template>

        <!-- 操作按钮 -->
        <div class="x-preview__top">
            <div class="x-preview__pages">{{ cur + 1 }}/{{ urls.length }}</div>
            <div class="x-preview__action">
                <template v-if="cpFileType === 'image'">
                    <!-- 缩小 -->
                    <div
                        class="x-preview__action-btn"
                        :class="{
                            'x-preview__action-btn--disabled': cpZoomOutBtnDisabled,
                        }"
                        @click="handleZoomOut">
                        <zoom-out-outlined />
                    </div>
                    <!-- 放大 -->
                    <div
                        class="x-preview__action-btn"
                        @click="handleZoomIn">
                        <zoom-in-outlined />
                    </div>
                    <!-- 左旋转 -->
                    <div
                        class="x-preview__action-btn"
                        @click="handleRotateLeft">
                        <rotate-left-outlined />
                    </div>
                    <!-- 右旋转 -->
                    <div
                        class="x-preview__action-btn"
                        @click="handleRotateRight">
                        <rotate-right-outlined />
                    </div>
                </template>
                <!-- 关闭 -->
                <div
                    class="x-preview__action-btn"
                    @click="handleClose">
                    <close-outlined></close-outlined>
                </div>
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
/**
 * @property {array} urls 文件
 * @property {number} current 当前显示
 * @property {function} afterClose 关闭后的回调函数
 */
const props = defineProps({
    urls: {
        type: Array,
        default: () => [],
    },
    current: {
        type: Number,
        default: 0,
    },
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

    &__image {
        transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        cursor: grab;
        max-width: 100%;
        max-height: 100%;
    }

    &__top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.1);
    }

    &__pages {
        color: rgba(255, 255, 255, 0.8);
        margin: 16px;
    }

    &__action {
        margin: 0 0 0 auto;
        display: flex;
        align-items: center;

        &-btn {
            min-width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.8);

            &--disabled {
                cursor: not-allowed;
                color: rgba(255, 255, 255, 0.25);
            }
        }
    }

    &__prev-btn,
    &__next-btn {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        top: 50%;
        transform: translate(0, -50%);
    }

    &__prev-btn {
        left: 16px;
    }

    &__next-btn {
        right: 16px;
    }
}
</style>
