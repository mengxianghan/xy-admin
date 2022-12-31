<template>
    <div
        class="x-resize-box"
        ref="resizeBoxRef"
        :style="styles">
        <slot></slot>

        <div
            v-for="direction in directions"
            class="x-resize-box-handle"
            :key="direction"
            :class="{
                [`x-resize-box-handle--${direction}`]: true,
                'x-resize-box-handle--active': state.moving && directionEnum.is(direction, state.direction),
            }"
            @mousedown="(e) => onMoveStart(direction, e)"></div>
    </div>
</template>

<script>
export default {
    name: 'XResizeBox',
}
</script>

<script setup>
import { computed, ref, reactive } from 'vue'

import { directionEnum } from './config'

/**
 * @property {number} width // 宽
 * @property {number} height // 高
 * @property {array} directions // 可以进行伸缩的边，默认：['right']；['left', 'right', 'top', 'bottom']
 */
const props = defineProps({
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    directions: {
        type: Array,
        default: () => ['right'],
    },
})

const emit = defineEmits(['movingStart', 'moving', 'movingEnd', 'update:width', 'update:height'])

const resizeBoxRef = ref()
const state = reactive({
    moving: false,
    direction: '',
    startPageX: 0,
    startPageY: 0,
    startWidth: 0,
    startHeight: 0,
    currentWidth: props.width,
    currentHeight: props.height,
})
const styles = computed(() => ({
    width: `${state.currentWidth}px`,
    height: `${state.currentHeight}px`,
    maxWidth: '100%',
}))

/**
 * 拖动开始
 * @param {*} e
 */
function onMoveStart(direction, e) {
    state.moving = true
    state.direction = direction
    state.startPageX = e.pageX
    state.startPageY = e.pageY
    state.startWidth = resizeBoxRef.value.offsetWidth
    state.startHeight = resizeBoxRef.value.offsetHeight
    document.body.style.cursor = directionEnum.is(['left', 'right'], direction) ? 'col-resize' : 'row-resize'

    window.addEventListener('mousemove', onMoving)
    window.addEventListener('mouseup', onMoveEnd)
    window.addEventListener('contextmenu', onMoveEnd)

    emit('movingStart', e)
}

/**
 * 拖动中
 */
function onMoving(e) {
    const { direction, startPageX, startPageY, startWidth, startHeight } = state

    // 往右移动的距离
    const offsetX = e.pageX - startPageX
    // 往下移动的距离
    const offsetY = e.pageY - startPageY

    switch (direction) {
        // 上
        case directionEnum.getValue('top'):
            state.currentHeight = startHeight - offsetY
            emit('update:height', state.currentHeight)
            break
        // 下
        case directionEnum.getValue('bottom'):
            state.currentHeight = startHeight + offsetY
            emit('update:height', state.currentHeight)
            break
        // 左
        case directionEnum.getValue('left'):
            state.currentWidth = startWidth - offsetX
            emit('update:width', state.currentWidth)
            break
        // 右
        case directionEnum.getValue('right'):
            state.currentWidth = startWidth + offsetX
            emit('update:width', state.currentWidth)
            break
    }
    emit('moving', { width: state.currentWidth, height: state.currentHeight })
}

/**
 * 拖动结束
 */
function onMoveEnd(e) {
    state.moving = false
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMoving)
    window.removeEventListener('mouseup', onMoveEnd)
    window.removeEventListener('contextmenu', onMoveEnd)
    emit('movingEnd', e)
}
</script>

<style lang="less" scoped>
@handle-size: 4px;

.x-resize-box {
    position: relative;
    overflow: hidden;

    &-handle {
        position: absolute;
        transition: all 0.3s;
        z-index: 999;
        user-select: none;

        &--active,
        &:hover {
            background: @primary-color;
        }

        &--left,
        &--right {
            width: @handle-size;
            top: 0;
            bottom: 0;
            cursor: col-resize;
        }

        &--left {
            left: 0;
        }

        &--right {
            right: 0;
        }

        &--top,
        &--bottom {
            left: 0;
            right: 0;
            height: @handle-size;
            cursor: row-resize;
        }

        &--top {
            top: 0;
        }

        &--bottom {
            bottom: 0;
        }
    }
}
</style>
