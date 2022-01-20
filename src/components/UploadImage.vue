<template>
    <div class="x-upload">
        <a-upload v-if="showUploadBtn"
                  :show-upload-list="false"
                  :before-upload="onBeforeUpload"
                  :custom-request="onUpload">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <div class="x-upload-btn">
                    <icon-plus-outlined class="x-upload-btn__icon"/>
                    <div class="x-upload-btn__txt">上传图片</div>
                </div>
            </template>
        </a-upload>
        <div class="x-upload-list">
            <div v-for="(item, index) in list"
                 :key="index"
                 class="x-upload-item">
                <img :src="item.src">
            </div>
        </div>
    </div>
</template>

<script>
import {computed, ref, toRefs} from 'vue'

/**
 * @property {boolean} multiple 批量上传，默认：false
 */
export default {
    name: 'UploadImage',
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const {multiple} = toRefs(props)
        const list = ref([])

        const showUploadBtn = computed(() => {
            return multiple.value || !list.value.length
        })

        /**
         * 上传前
         */
        function onBeforeUpload(info) {
        }

        /**
         * 上传
         */
        function onUpload(info) {
            _updateList(info)
        }

        /**
         * 更新上传列表
         */
        function _updateList({file}) {
            const record = {
                uid: file.uid,
                src: URL.createObjectURL(file),
            }
            console.log(multiple.value)
            // 判断是否批量上传
            if (multiple.value) {
                // 批量上传
                list.value.push(record)
            } else {
                // 单文件上传
                list.value = [record]
            }
        }

        return {
            list,
            showUploadBtn,
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

    &-btn {
        width: 120px;
        height: 120px;
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
            font-size: 18px;
        }

        &__txt {
            margin: @margin-xss 0 0;
        }
    }

    &-list {

    }

    &-item {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>