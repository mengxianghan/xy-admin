<template>
    <div
        class="x-resize-box"
        ref="resizeBoxRef"
        :style="cpStyle">
        <div class="x-resize-box-body">
            <slot></slot>
        </div>
        <template v-if="!disabled">
            <div
                v-for="direction in directions"
                class="x-resize-box-handle"
                :key="direction"
                :class="{
                    [`x-resize-box-handle--${direction}`]: true,
                    'x-resize-box-handle--active': state.moving && directionEnum.is(direction, state.direction),
                }"
                @mousedown="(e) => onMoveStart(direction, e)"></div>
        </template>
    </div>
</template>

<script setup>
import { computed, reactive, ref, useSlots } from 'vue'
import { directionEnum } from './config'

defineOptions({
    name: 'XResizeBox',
})
/**
 * @property {number} width 宽
 * @property {number} height 高
 * @property {number} minWidth 最小宽度，默认：100
 * @property {number} minHeight 最小高度，默认：100
 * @property {array} directions 可以进行伸缩的边，默认：['right']；['left', 'right', 'top', 'bottom']
 * @property {boolean} disabled 禁用
 */
const props = defineProps({
    width: Number,
    height: Number,
    minWidth: {
        type: Number,
        default: 100,
    },
    minHeight: {
        type: Number,
        default: 100,
    },
    directions: {
        type: Array,
        default: () => ['right'],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['movingStart', 'moving', 'movingEnd', 'update:width', 'update:height'])

useSlots(['default'])

const resizeBoxRef = ref()

const state = reactive({
    moving: false,
    direction: '',
    startPageX: 0,
    startPageY: 0,
    startWidth: 0,
    startHeight: 0,
    currentWidth: props.width || props.minWidth,
    currentHeight: props.height || props.minHeight,
})

const cpStyle = computed(() => ({
    width: `${state.currentWidth}px`,
    height: `${state.currentHeight}px`,
    maxWidth: '100%',
}))

/**
 * 拖动开始
 * @param {string} direction 方向
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

    let width
    let height

    switch (direction) {
        // 上
        case directionEnum.getValue('top'):
            height = startHeight - offsetY
            state.currentHeight = height < props.minHeight ? props.minHeight : height
            emit('update:height', state.currentHeight)
            break
        // 下
        case directionEnum.getValue('bottom'):
            height = startHeight + offsetY
            state.currentHeight = height < props.minHeight ? props.minHeight : height
            emit('update:height', state.currentHeight)
            break
        // 左
        case directionEnum.getValue('left'):
            width = startWidth - offsetX
            state.currentWidth = width < props.minWidth ? props.minWidth : width
            emit('update:width', state.currentWidth)
            break
        // 右
        case directionEnum.getValue('right'):
            width = startWidth + offsetX
            state.currentWidth = width < props.minWidth ? props.minWidth : width
            console.log('state.currentWidth', width < props.minWidth ? props.minWidth : width)
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
.x-resize-box {
    position: relative;

    &-body {
        overflow: hidden;
        height: 100%;
        overflow: auto;
    }

    &-handle {
        position: absolute;
        transition: all 0.2s;
        z-index: 999;
        user-select: none;

        &::after {
            position: absolute;
            content: '';
            transition: all 0.2s;
        }

        &--active,
        &:hover {
            &::after {
                background: @color-primary;
            }
        }

        &--left,
        &--right {
            width: 8px;
            top: 0;
            bottom: 0;
            cursor: col-resize;

            &::after {
                top: 0;
                bottom: 0;
                width: 4px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &--left {
            left: 0;
            transform: translateX(-4px);
        }

        &--right {
            right: 0;
            transform: translateX(4px);
        }

        &--top,
        &--bottom {
            left: 0;
            right: 0;
            height: 8px;
            cursor: row-resize;

            &::after {
                left: 0;
                right: 0;
                height: 4px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        &--top {
            top: 0;
            transform: translateY(-4px);
        }

        &--bottom {
            bottom: 0;
            transform: translateY(4px);
        }
    }
}
</style>
