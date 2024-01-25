<template>
    <component
        :is="component"
        ref="resizeBoxRef"
        :style="styleComputed"
        class="x-resize-box">
        <div class="x-resize-box-body">
            <slot></slot>
        </div>
        <template v-if="!disabled">
            <div
                v-for="direction in directions"
                :key="direction"
                :class="{
                    [`x-resize-box-handle--${direction}`]: true,
                    'x-resize-box-handle--active': state.moving && directionEnum.is(direction, state.direction),
                }"
                class="x-resize-box-handle"
                @mousedown="(e) => onMoveStart(direction, e)"></div>
        </template>
    </component>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { directionEnum } from './config'
import { formatUnits } from '@/components/utils'

defineOptions({
    name: 'XResizeBox',
})

const props = defineProps({
    /**
     * 标签
     */
    component: {
        type: String,
        default: 'div',
    },
    /**
     * 宽
     */
    width: Number,
    /**
     * 高
     */
    height: Number,
    /**
     * 最小宽度
     */
    minWidth: {
        type: [String, Number],
        default: 100,
    },
    /**
     * 最小高度
     */
    minHeight: {
        type: [String, Number],
        default: 100,
    },
    /**
     * 最大宽度
     */
    maxWidth: {
        type: [String, Number],
        default: '100%',
    },
    /**
     * 最大高度
     */
    maxHeight: [String, Number],
    /**
     * 可以进行伸缩的边，可选：['left', 'right', 'top', 'bottom']
     */
    directions: {
        type: Array,
        default: () => ['right'],
    },
    /**
     * 禁用
     */
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['movingStart', 'moving', 'movingEnd', 'update:width', 'update:height'])

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

const styleComputed = computed(() => ({
    width: `${state.currentWidth}px`,
    height: `${state.currentHeight}px`,
    minWidth: formatUnits(props.minWidth),
    maxWidth: formatUnits(props.maxWidth),
    minHeight: formatUnits(props.minHeight),
    maxHeight: formatUnits(props.maxHeight),
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

    emits('movingStart', e)
}

/**
 * 拖动中
 */
function onMoving(e) {
    const { direction, startPageX, startPageY, startWidth, startHeight } = state

    console.log(state, e.pageX)

    // 往右移动的距离
    const offsetX = e.pageX - startPageX
    // 往下移动的距离
    const offsetY = e.pageY - startPageY

    let width
    let height

    switch (direction) {
        case directionEnum.getValue('top'): // 上
        case directionEnum.getValue('bottom'): // 下
            height = startHeight + offsetY
            state.currentHeight = height
            if (height < props.minHeight) {
                state.currentHeight = props.minHeight
            }
            if (height > props.maxHeight && props.maxHeight > props.minHeight) {
                state.currentHeight = props.maxHeight
            }
            emits('update:height', state.currentHeight)
            break
        case directionEnum.getValue('left'): // 左
        case directionEnum.getValue('right'): // 右
            width = startWidth + offsetX
            state.currentWidth = width
            if (width < props.minWidth) {
                state.currentWidth = props.minWidth
            }
            if (width > props.maxWidth && props.maxWidth > props.minWidth) {
                state.currentWidth = props.maxWidth
            }
            emits('update:width', state.currentWidth)
            break
    }
    emits('moving', { width: state.currentWidth, height: state.currentHeight })
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
    emits('movingEnd', e)
}
</script>

<style lang="less" scoped>
.x-resize-box {
    position: relative;

    @handle-size: 4px;
    @size: 2px;

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
            width: calc(@handle-size + @size * 2);
            top: 0;
            bottom: 0;
            cursor: col-resize;

            &::after {
                top: 0;
                bottom: 0;
                width: @handle-size;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &--left {
            left: -@size;
            transform: translateX(calc(@handle-size / -1));
        }

        &--right {
            right: -@size;
            transform: translateX(@handle-size);
        }

        &--top,
        &--bottom {
            left: 0;
            right: 0;
            height: calc(@handle-size + @size * 2);
            cursor: row-resize;

            &::after {
                left: 0;
                right: 0;
                height: @handle-size;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        &--top {
            top: -@size;
            transform: translateY(calc(@handle-size / -1));
        }

        &--bottom {
            bottom: -@size;
            transform: translateY(@handle-size);
        }
    }
}
</style>
