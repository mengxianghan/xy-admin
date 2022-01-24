<template>
    <div class="x-upload"
         :class="{
            'x-upload--round': round
         }">
        <a-upload v-if="showUploadBtn"
                  :show-upload-list="false"
                  :multiple="multiple"
                  :before-upload="onBeforeUpload"
                  :custom-request="({file})=>onUpload(file)"
                  :accept="accept">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <div class="x-upload-btn"
                     :style="{
                        width: `${width}px`,
                        height: `${height}px`
                    }">
                    <component :is="icon"
                               class="x-upload-btn__icon"/>
                    <div v-if="text"
                         class="x-upload-btn__txt">
                        {{ text }}
                    </div>
                </div>
            </template>
        </a-upload>
        <div v-for="(item,index) in list"
             :key="item.key"
             class="x-upload-item"
             :class="{
                     'x-upload-item--error': STATUS_ENUM.is('error', item.status),
                 }"
             :style="{
                     width: `${width}px`,
                     height: `${height}px`
                }">
            <img :src="item.src">
            <template v-if="['error', 'done'].includes(STATUS_ENUM.getKey(item.status))">
                <div class="x-upload-actions">
                    <div v-if="STATUS_ENUM.is('done', item.status)"
                         class="x-upload-action">
                        <icon-eye-outlined/>
                    </div>
                    <div class="x-upload-action"
                         @click="handleRemove(index)">
                        <icon-delete-outlined/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="x-upload-status">
                    <template v-if="STATUS_ENUM.is('uploading', item.status)">
                        <div>{{ item.percent }}%</div>
                        <a-progress :show-info="false"
                                    :stroke-width="4"
                                    :percent="item.percent"/>
                    </template>
                    <template v-if="STATUS_ENUM.is('wait', item.status)">
                        <div>{{ STATUS_ENUM.getDesc(item.status) }}</div>
                        <span class="x-upload-action"
                              @click="handleCancel(item)">取消上传</span>
                    </template>
                </div>
            </template>
        </div>
    </div>

    <!--裁剪-->
    <cropper-modal v-if="cropper && !multiple"
                   ref="cropperModalRef"
                   :aspect-ratio="aspectRatio"
                   :quality="quality"
                   @ok="(file)=>onUpload(file)"/>
</template>

<script>
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {STATUS_ENUM} from './enum'
import {mergeDeep} from '@/utils'
import {v4 as uuidv4} from 'uuid'
import {Form, message} from 'ant-design-vue'

import filesizeParser from 'filesize-parser'
import filesize from 'filesize'

import CropperModal from '../CropperModal'

/**
 * 图片上传
 * @property {string | array} model-value v-model
 * @property {boolean} multiple 批量上传，默认：false
 * @property {number} width 宽，默认：120，单位：px
 * @property {number} height 高，默认：120，单位：px
 * @property {string} icon 图标
 * @property {string} text 文案
 * @property {string | number} max-size 最大限制，默认：2M
 * @property {boolean} round 圆角
 * @property {boolean} cropper 裁剪，仅支持单文件上传，默认：false，
 * @property {number} aspect-ratio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
export default {
    name: 'UploadImage',
    components: {CropperModal},
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
    },
    setup(props, {emit}) {
        const {multiple, maxSize, modelValue, cropper} = toRefs(props)
        const fileList = ref([])
        const queue = ref([])
        const {onFieldChange} = Form.useInjectFormItemContext()
        const cropperModalRef = ref()

        const list = computed(() => [...fileList.value, ...queue.value])
        const loading = computed(()=>queue.value.some(o=>STATUS_ENUM.is('uploading', o.status)))

        const showUploadBtn = computed(() => {
            return multiple.value || !list.value.length
        })

        watch(() => modelValue.value, () => {
            _init()
        })

        onMounted(() => {
            _init()
        })

        function _init() {
            const currentValue = modelValue.value
                ? modelValue.value instanceof Array
                    ? modelValue.value
                    : [modelValue.value]
                : []
            fileList.value = currentValue.map((item) => _getItem({src: item}))
        }

        /**
         * 移除
         * @param index
         */
        function handleRemove(index) {
            fileList.value.splice(index, 1)
            _trigger()
        }

        /**
         * 取消上传
         */
        function handleCancel({key}) {
            const index = queue.value.findIndex(o => o.key === key)
            queue.value.splice(index, 1)
        }

        /**
         * 上传前
         */
        function onBeforeUpload(file) {
            const maxFileSize = maxSize.value instanceof Number ? maxSize.value : filesizeParser(maxSize.value, {base: 10.24})
            const checkFileSize = file?.size < maxFileSize
            if (!checkFileSize) {
                message.warning(`已忽略超过 ${filesize(maxFileSize, {base: 10.24})} 的文件`)
            }
            const checkCropper = cropper.value
                ? multiple.value ? true : false
                : true
            if (cropper.value && !multiple.value) {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = (e) => {
                    cropperModalRef.value?.handleOpen(e.target.result)
                }
            }
            return checkFileSize && checkCropper
        }

        /**
         * 上传
         */
        function onUpload(file) {
            const record = _getItem({
                key: file.uid,
                src: URL.createObjectURL(file),
                status: STATUS_ENUM.getValue('wait'),
                percent: 0,
            })
            // 判断是否批量上传
            if (multiple.value) {
                // 批量上传
                queue.value.push(record)
            } else {
                // 单文件上传
                queue.value = [record]
            }
            if (!loading.value) {
                _doUpload()
            }
        }

        /**
         * 上传
         */
        function _doUpload() {
            if (!queue.value.length) {
                return
            }
            const index = 0
            const file = queue.value[index]
            file.status = STATUS_ENUM.getValue('uploading')
            const times = setInterval(() => {
                if (file.percent === 100) {
                    clearInterval(times)
                    file.status = STATUS_ENUM.getValue('done')
                    fileList.value.push(...queue.value.splice(index, 1))
                    _trigger()
                    _doUpload()
                    return
                }
                file.percent += 1
            }, 50)
        }

        /**
         * 基础结构
         * @return {{}}
         */
        function _getItem(obj) {
            return mergeDeep({
                key: uuidv4(),
                src: '',
                status: STATUS_ENUM.getValue('done'),
                percent: 100,
            }, obj)
        }

        function _trigger() {
            let value = ''
            // 判断是否多选
            if (multiple.value) {
                // 多选
                value = fileList.value.map(item => {
                    return item?.src ?? item
                })
            } else {
                // 单选
                value = (fileList.value.length ? fileList.value[0]?.src : fileList.value[0]) ?? ''
            }
            emit('update:modelValue', value)
            onFieldChange()
        }

        return {
            STATUS_ENUM,
            list,
            showUploadBtn,
            cropperModalRef,
            multiple,
            handleRemove,
            handleCancel,
            onBeforeUpload,
            onUpload,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-upload {
    display: flex;
    flex-wrap: wrap;
    gap: @margin-sm;

    &--round {
        .x-upload-btn,
        .x-upload-item {
            border-radius: @border-radius-round;
        }
    }

    &-btn {
        border: @border-color-base dashed 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .15s;

        &:hover {
            border-color: @primary-color;
            color: @primary-color;
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
        background: rgba(0, 0, 0, .25);
        opacity: 0;
        transition: all .15s;
    }

    &-action {
        min-width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        background: rgba(0, 0, 0, .25);
        transition: all .15s;
        font-size: 12px;
        padding: 0 4px;

        &:hover {
            background: rgba(0, 0, 0, .5);
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
        background: rgba(0, 0, 0, .25);
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
