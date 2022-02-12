<template>
    <a-modal :visible="visible"
             width="100%"
             wrap-class-name="full-modal"
             :footer="false"
             @cancel="handleHide">
        <div class="x-preview__content">
            <img :src="url"
                 :style="styles"/>
        </div>

        <template v-if="prevBtn || nextBtn">
            <div v-if="prevBtn"
                 class="x-preview__left-btn"
                 @click="handleAction(TYPE_ENUM.getValue('prev'))">
                <icon-left-outlined/>
            </div>

            <div v-if="nextBtn"
                 class="x-preview__right-btn"
                 @click="handleAction(TYPE_ENUM.getValue('next'))">
                <icon-right-outlined/>
            </div>
        </template>

        <!--<div class="x-preview-action-bar">
            <div class="x-preview-action-bar-item"
                 @click="handleAction(TYPE_ENUM.getValue('zoomOut'))">
                <icon-zoom-out-outlined/>
            </div>
            <div class="x-preview-action-bar-item"
                 @click="handleAction(TYPE_ENUM.getValue('zoomIn'))">
                <icon-zoom-in-outlined/>
            </div>
            <div class="x-preview-action-bar-item"
                 @click="handleAction(TYPE_ENUM.getValue('fullscreen'))">
                <icon-fullscreen-outlined/>
            </div>
            <div class="x-preview-action-bar-item"
                 @click="handleAction(TYPE_ENUM.getValue('rotateLeft'))">
                <icon-rotate-left-outlined/>
            </div>
            <div class="x-preview-action-bar-item"
                 @click="handleAction(TYPE_ENUM.getValue('rotateRight'))">
                <icon-rotate-right-outlined/>
            </div>
        </div>-->
    </a-modal>
</template>

<script>
import {computed, ref, toRefs, watch} from 'vue'
import {TYPE_ENUM} from './types'

/**
 * @property {array} url-list
 */
export default {
    name: 'Preview',
    props: {
        urlList: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const {urlList} = toRefs(props)
        const visible = ref(false)
        const styles = ref({})
        const current = ref(0)
        const prevBtn = ref(true)
        const nextBtn = ref(true)
        const url = computed(() => urlList.value[current.value])

        watch(() => urlList, (val) => {
            prevBtn.value = val.value.length > 0 && current.value > 0
            nextBtn.value = val.value.length > 0 && current.value < val.value.length - 1
        }, {immediate: true})

        /**
         * 显示
         */
        function handleShow() {
            visible.value = true
        }

        /**
         * 关闭
         */
        function handleHide() {
            visible.value = false
        }

        /**
         * 操作
         * @param type
         */
        function handleAction(type) {
            switch (type) {
                // 缩小
                case TYPE_ENUM.getValue('zoomOut'):
                    break
                // 放大
                case TYPE_ENUM.getValue('zoomIn'):
                    break
                // 全屏
                case TYPE_ENUM.getValue('fullscreen'):
                    console.log('全屏')
                    break
                // 向左旋转
                case TYPE_ENUM.getValue('rotateLeft'):
                    break
                // 向右旋转
                case TYPE_ENUM.getValue('rotateRight'):
                    break
                // 上一个
                case TYPE_ENUM.getValue('prev'):
                    if (current.value > 0) {
                        current.value -= 1
                    }
                    onCurrentChange()
                    break
                // 下一个
                case TYPE_ENUM.getValue('next'):
                    if (current.value < urlList.value.length - 1) {
                        current.value += 1
                    }
                    onCurrentChange()
                    break
            }
        }

        /**
         * current 发生改变
         */
        function onCurrentChange() {
            prevBtn.value = current.value > 0
            nextBtn.value = current.value < urlList.value.length - 1
        }

        return {
            TYPE_ENUM,
            visible,
            styles,
            url,
            prevBtn,
            nextBtn,
            handleShow,
            handleHide,
            handleAction,
        }
    },
}
</script>

<style lang="less">
.full-modal {
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
    }

    .ant-modal-close {
        top: 40px;
        right: 40px;
    }

    .ant-modal-close-x {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        border-radius: @border-radius-round;
        background: @background-color-mask;
        color: #fff;
        font-size: 14px;
    }

    .ant-modal-body {
        flex: 1;
        padding: 0;
    }
}
</style>

<style lang="less"
       scoped>
.x-preview {
    &__content {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        > * {
            max-width: 100%;
            max-height: 100%;
            transition: all .3s;
        }
    }

    &-action-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        color: #fff;
        position: fixed;
        bottom: 40px;
        background: @background-color-mask;
        border-radius: @border-radius-round;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        height: 44px;
        padding: 0 16px;
        font-size: 16px;
        z-index: 100;

        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
            cursor: pointer;
        }
    }

    &__left,
    &__right {
        &-btn {
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            border-radius: @border-radius-round;
            background: @background-color-mask;
            color: #fff;
            position: fixed;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 100;
            cursor: pointer;
        }
    }

    &__left-btn {
        left: 40px;
    }

    &__right-btn {
        right: 40px;
    }
}
</style>