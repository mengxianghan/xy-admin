<template>
    <div
        ref="uploadImageRef"
        class="x-upload x-upload-image"
        :class="{
            'x-upload--round': round,
            'x-upload--disabled': disabled,
        }">
        <a-upload
            v-if="showUploadBtn"
            :show-upload-list="false"
            :multiple="multiple"
            :before-upload="onBeforeUpload"
            :custom-request="({ file }) => customRequest(file)"
            :accept="accept"
            :disabled="disabled">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <div
                    class="x-upload-btn"
                    :class="{
                        'x-upload-btn--hover': !disabled,
                    }"
                    :style="{
                        width: `${width}px`,
                        height: `${height}px`,
                    }">
                    <div class="x-upload-btn__icon">
                        <template v-if="cpShowIconSlot">
                            <slot name="icon"></slot>
                        </template>
                        <template v-else>
                            <component :is="icon" />
                        </template>
                    </div>
                    <div
                        v-if="text"
                        class="x-upload-btn__txt">
                        <template v-if="cpShowTextSlot"></template>
                        <template v-else>{{ text }}</template>
                    </div>
                </div>
            </template>
        </a-upload>
        <div
            v-for="(item, index) in fileList"
            class="x-upload-item j-upload-item"
            :key="item.key"
            :class="{
                'x-upload-item--error': STATUS_ENUM.is('error', item.status),
            }"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
            }">
            <img :src="item.src" />
            <template v-if="['error', 'done'].includes(STATUS_ENUM.getKey(item.status))">
                <div class="x-upload-actions">
                    <div
                        v-if="STATUS_ENUM.is('done', item.status)"
                        class="x-upload-action"
                        @click="handlePreview(item)">
                        <icon-eye-outlined />
                    </div>
                    <div
                        v-if="!disabled"
                        class="x-upload-action"
                        @click="handleRemove(index)">
                        <icon-delete-outlined />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="x-upload-status">
                    <template v-if="STATUS_ENUM.is('uploading', item.status)">
                        <div>{{ item.percent }}%</div>
                        <a-progress
                            :show-info="false"
                            :stroke-width="4"
                            :percent="item.percent" />
                    </template>
                    <template v-if="STATUS_ENUM.is('wait', item.status)">
                        <div>{{ STATUS_ENUM.getDesc(item.status) }}</div>
                        <span
                            class="x-upload-action"
                            @click="handleCancel(item)">
                            取消上传
                        </span>
                    </template>
                </div>
            </template>
        </div>
    </div>

    <!--裁剪-->
    <cropper-dialog
        v-if="cropper && !multiple"
        ref="cropperDialogRef"
        :aspect-ratio="aspectRatio"
        :quality="quality"
        @ok="(file) => customRequest(file)" />
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import { Form, message } from 'ant-design-vue'
import { deepMerge } from '@/utils'
import { STATUS_ENUM } from './config'
import { filesize } from 'filesize'
import { some, findIndex, includes } from 'lodash-es'
import Sortable from 'sortablejs'
import filesizeParser from 'filesize-parser'
import api from '@/api'

import Preview from '../Preview'
import CropperDialog from '../CropperDialog.vue'

/**
 * 图片上传
 * @property {string | array} modelValue v-model
 * @property {boolean} multiple 批量上传，默认：false
 * @property {number} width 宽，默认：120，单位：px
 * @property {number} height 高，默认：120，单位：px
 * @property {string} icon 图标
 * @property {string} text 文案
 * @property {string | number} maxSize 最大限制，默认：2M
 * @property {string} accept 允许上传文件类型，默认：image/*
 * @property {boolean} disabled 禁用，默认：false
 * @property {boolean} round 圆角
 * @property {boolean} cropper 裁剪，仅支持单文件上传，默认：false，
 * @property {number} aspectRatio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 * @property {boolean} dragsort 拖拽排序，默认：false
 */
export default {
    name: 'XUploadImage',
    components: { CropperDialog },
    props: {
        modelValue: {
            type: [String, Array],
            default: '',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 120,
        },
        height: {
            type: Number,
            default: 120,
        },
        icon: {
            type: String,
            default: 'icon-plus-outlined',
        },
        text: {
            type: String,
            default: '',
        },
        maxSize: {
            type: [String, Number],
            default: '2M',
        },
        accept: {
            type: String,
            default: 'image/*',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        cropper: {
            type: Boolean,
            default: false,
        },
        aspectRatio: {
            type: Number,
            default: 0,
        },
        quality: {
            type: Number,
            default: 1,
        },
        dragsort: {
            type: Boolean,
            default: false,
        },
    },
    slots: ['icon', 'text'],
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { onFieldChange } = Form.useInjectFormItemContext()

        const fileList = ref([])
        const cropperDialogRef = ref()
        const uploadImageRef = ref()
        const sortable = ref(null)

        const loading = computed(() => fileList.value.some((o) => STATUS_ENUM.is('uploading', o.status)))
        const showUploadBtn = computed(() => props.multiple || !fileList.value.length)
        const cpShowIconSlot = computed(() => slots.icon)
        const cpShowTextSlot = computed(() => slots.text)
        const dragsortDisabled = computed(() => (props.dragsort && !props.disabled ? false : true))

        watch(
            () => props.modelValue,
            () => {
                init()
            }
        )

        watch(
            () => dragsortDisabled.value,
            () => {
                initDragSort()
            }
        )

        onMounted(() => {
            init()
            initDragSort()
        })

        /**
         * 初始化
         */
        function init() {
            const currentValue = props.modelValue
                ? props.modelValue instanceof Array
                    ? props.modelValue
                    : [props.modelValue]
                : []
            if (currentValue.length) {
                // 移除不存在的文件
                fileList.value.forEach((item, index) => {
                    // 已完成 && 不存在与 modelValue 中
                    if (STATUS_ENUM.is('done', item.status) && !includes(currentValue, item.src)) {
                        fileList.value.splice(index, 1)
                    }
                })
                // 添加不存在与 modelValue 中的文件
                currentValue.forEach((item) => {
                    if (!some(fileList.value, { src: item })) {
                        fileList.value.push(getItem({ src: item }))
                    }
                })
            } else {
                fileList.value = []
            }
        }

        /**
         * 初始化拖拽排序
         */
        function initDragSort() {
            if (sortable.value) {
                sortable.value.destroy()
                sortable.value = null
            }
            sortable.value = Sortable.create(uploadImageRef.value, {
                handle: '.j-upload-item',
                animation: 200,
                disabled: dragsortDisabled.value,
                onEnd: ({ newIndex, oldIndex }) => {
                    const dragData = fileList.value.splice(oldIndex - 1, 1)[0]
                    fileList.value.splice(newIndex - 1, 0, dragData)
                    trigger()
                },
            })
        }

        /**
         * 预览
         * @param {*} record
         */
        function handlePreview(record) {
            Preview({
                urls: [record.src],
            })
        }

        /**
         * 移除
         * @param index
         */
        function handleRemove(index) {
            fileList.value.splice(index, 1)
            trigger()
        }

        /**
         * 取消上传
         */
        function handleCancel({ key }) {
            const index = fileList.value.findIndex((o) => o.key === key)
            fileList.value.splice(index, 1)
        }

        /**
         * 上传前
         */
        function onBeforeUpload(file) {
            const maxFileSize = props.maxSize instanceof Number ? props.maxSize : filesizeParser(props.maxSize)
            const checkFileSize = file?.size < maxFileSize
            if (!checkFileSize) {
                message.warning(`已忽略超过 ${filesize(maxFileSize)} 的文件`)
            }
            const checkCropper = props.cropper ? (props.multiple ? true : false) : true
            if (props.cropper && !props.multiple) {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = (e) => {
                    cropperDialogRef.value?.handleOpen(e.target.result)
                }
            }
            return checkFileSize && checkCropper
        }

        /**
         * 拖拽结束
         */
        // function onDragEnd() {
        //     trigger()
        // }

        /**
         * 自定义上传
         */
        function customRequest(file) {
            const record = getItem({
                key: file.uid,
                src: URL.createObjectURL(file),
                status: STATUS_ENUM.getValue('wait'),
                percent: 0,
                file,
            })
            // 判断是否批量上传
            if (props.multiple) {
                // 批量上传
                fileList.value.push(record)
            } else {
                // 单文件上传
                fileList.value = [record]
            }
            if (!loading.value) {
                doUpload()
            }
        }

        /**
         * 执行上传
         */
        async function doUpload() {
            // 判断是否还有待上传文件
            if (!some(fileList.value, { status: STATUS_ENUM.getValue('wait') })) {
                return
            }
            const index = findIndex(fileList.value, { status: STATUS_ENUM.getValue('wait') })
            const record = fileList.value[index]
            record.status = STATUS_ENUM.getValue('uploading')
            const { code } = await api.common.upload({
                file: record?.file,
            })
            if (200 === code) {
                // 上传进度，真实接口可改为真实数据
                record.percent = 100
                record.status = STATUS_ENUM.getValue('done')
                // record.src = data?.src
                trigger()
                await doUpload()
            }
        }

        /**
         * 基础结构
         * @return {{}}
         */
        function getItem(obj) {
            return deepMerge(
                {
                    key: nanoid(),
                    src: '',
                    status: STATUS_ENUM.getValue('done'),
                    percent: 100,
                },
                obj
            )
        }

        /**
         * 触发
         */
        function trigger() {
            let value = ''
            // 判断是否多选
            if (props.multiple) {
                // 多选
                value = fileList.value
                    .filter((item) => STATUS_ENUM.is('done', item.status))
                    .map((item) => item?.src ?? item)
            } else {
                // 单选
                value = (fileList.value.length ? fileList.value[0]?.src : fileList.value[0]) ?? ''
            }
            emit('update:modelValue', value)
            onFieldChange()
        }

        return {
            STATUS_ENUM,
            fileList,
            showUploadBtn,
            cpShowIconSlot,
            cpShowTextSlot,
            cropperDialogRef,
            uploadImageRef,
            handlePreview,
            handleRemove,
            handleCancel,
            onBeforeUpload,
            customRequest,
        }
    },
}
</script>

<style lang="less" scoped>
.x-upload {
    display: flex;
    flex-wrap: wrap;
    gap: @margin-sm;

    // 圆角
    &--round {
        .x-upload-btn,
        .x-upload-item {
            border-radius: @border-radius-round;
        }
    }

    // 禁用
    &--disabled {
        .x-upload-btn {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    &-btn {
        border: @border-color-base dashed 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;

        &--hover {
            &:hover {
                border-color: @primary-color;
                color: @primary-color;
            }
        }

        &__icon {
            font-size: 20px;
        }

        &__txt {
            margin: @margin-xss 0 0;
        }
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        background: @background-color-base;
        border-radius: @border-radius-base;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &:hover {
            .x-upload-actions {
                opacity: 1;
            }
        }

        &--error {
            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                border: @error-color dashed 1px;
                z-index: 2;
                pointer-events: none;
            }
        }
    }

    &-actions {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.25);
        opacity: 0;
        transition: all 0.15s;
    }

    &-action {
        min-width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.25);
        transition: all 0.15s;
        font-size: 12px;
        padding: 0 4px;

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
    }

    &-status {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.25);
        padding: 0 16px;
        color: #fff;

        &--error {
            color: @error-color;
        }

        &--done {
            color: @success-color;
        }
    }
}
</style>
