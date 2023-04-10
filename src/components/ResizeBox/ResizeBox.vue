<template>
    <div
            class="x-resize-box"
            ref="resizeBoxRef"
            :style="cpStyle">
        <slot></slot>

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

<script>
import { computed, ref, reactive } from 'vue'

import { directionEnum } from './config'

/**
 * @property {number} width 宽
 * @property {number} height 高
 * @property {number} minWidth 最小宽度。默认：0
 * @property {number} minHeight 最小高度。默认：0
 * @property {array} directions 可以进行伸缩的边，默认：['right']；['left', 'right', 'top', 'bottom']
 * @property {boolean} disabled 禁用
 */
export default {
    name: 'XResizeBox',
    props: {
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        minWidth: {
            type: Number,
            default: 0
        },
        minHeight: {
            type: Number,
            default: 0
        },
        directions: {
            type: Array,
            default: () => ['right'],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['movingStart', 'moving', 'movingEnd', 'update:width', 'update:height'],
    setup(props, { emit }) {
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
            width: `${ state.currentWidth }px`,
            height: `${ state.currentHeight }px`,
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

        return {
            directionEnum,
            state,
            resizeBoxRef,
            cpStyle,
            onMoveStart,
        }
    },
}
</script>

<style lang="less" scoped>
@handle-size: 3px;

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
