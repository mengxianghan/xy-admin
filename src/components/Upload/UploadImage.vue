<template>
    <div class="x-upload">
        <a-upload v-if="showUploadBtn"
                  :show-upload-list="false"
                  :multiple="multiple"
                  :before-upload="onBeforeUpload"
                  :custom-request="onUpload">
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
                         class="x-upload-btn__txt">{{ text }}
                    </div>
                </div>
            </template>
        </a-upload>
        <div v-for="(item,index) in allList"
             :key="item.key"
             class="x-upload-item"
             :class="{
                     'x-upload-item--error': STATUS_ENUM.is('error', item.status)
                 }"
             :style="{
                     width: `${width}px`,
                     height: `${height}px`
                }">
            <img :src="item.src">
            <template v-if="STATUS_ENUM.is('uploading', item.status)">
                <div class="x-upload-status">
                    <div>{{ item.percent }}%</div>
                    <a-progress :show-info="false"
                                :stroke-width="4"
                                :percent="item.percent"/>
                </div>
            </template>
            <template v-else>
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
        </div>
    </div>
</template>

<script>
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {STATUS_ENUM} from './enums'
import {findIndex, head} from 'lodash'
import {mergeDeep} from '@/utils'
import {v4 as uuidv4} from 'uuid'
import {message} from 'ant-design-vue'

import filesizeParser from 'filesize-parser'
import filesize from 'filesize'

/**
 * 图片上传
 * @property {string | array} model-value v-model
 * @property {boolean} multiple 批量上传，默认：false
 * @property {number} width 宽，默认：120，单位：px
 * @property {number} height 高，默认：120，单位：px
 * @property {string} icon 图标
 * @property {string} text 文案
 * @property {string | number} max 最大限制，默认：2M
 */
export default {
    name: 'UploadImage',
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
        max: {
            type: [String, Number],
            default: '2M',
        },
    },
    setup(props, ctx) {
        const {multiple, max, modelValue} = toRefs(props)
        const list = ref([])
        const queue = ref([])

        const allList = computed(() => [...list.value, ...queue.value])

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
            list.value = currentValue.map((item) => _getItem({src: item}))
        }

        /**
         * 移除
         * @param index
         */
        function handleRemove(index) {
            list.value.splice(index, 1)
            _trigger()
        }

        /**
         * 上传前
         */
        function onBeforeUpload(file) {
            const maxFileSize = max.value instanceof Number ? max.value : filesizeParser(max.value, {base: 10.24})
            const checkFileSize = file?.size < maxFileSize
            if (!checkFileSize) {
                message.warning(`已忽略超过 ${filesize(maxFileSize, {base: 10.24})} 的文件`)
            }
            return checkFileSize
        }

        /**
         * 上传
         */
        function onUpload({file}) {
            _updateList(file)
            const times = setInterval(() => {
                const index = findIndex(queue.value, {key: file?.uid})
                if (queue.value[index].percent === 100) {
                    clearInterval(times)
                    queue.value[index].status = STATUS_ENUM.getValue('done')
                    list.value.push(...queue.value.splice(index, 1))
                    _trigger()
                    return
                }
                queue.value[index].percent += 1
            }, 10)
        }

        /**
         * 更新上传列表
         */
        function _updateList(file) {
            const record = _getItem({
                key: file.uid,
                src: URL.createObjectURL(file),
                status: STATUS_ENUM.getValue('uploading'),
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
                value = list.value.map(item => {
                    return item?.src ?? item
                })
            } else {
                // 单选
                value = list.value.length ? list.value[0]?.src : list.value[0]
            }
            ctx.emit('update:modelValue', value)
        }

        return {
            STATUS_ENUM,
            allList,
            showUploadBtn,
            handleRemove,
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
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        background: rgba(0, 0, 0, .25);
        transition: all .15s;

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
